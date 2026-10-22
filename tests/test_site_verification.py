import os
import re
import json
import unittest
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent

class TestSamenOnlineVerification(unittest.TestCase):
    def test_out_directory_and_index_exist(self):
        index_html = WORKSPACE / "out" / "index.html"
        self.assertTrue(index_html.exists(), "out/index.html must exist after static build")
        self.assertGreater(index_html.stat().st_size, 1000, "out/index.html should have substantial content")

    def test_bot_shielding_no_plaintext_email_in_static_html(self):
        index_html = WORKSPACE / "out" / "index.html"
        content = index_html.read_text(encoding="utf-8")
        # Ensure raw plaintext email is NEVER rendered directly into the static HTML
        self.assertNotIn("samen_online@outlook.com", content, "Email must be bot-shielded and never appear in static HTML")
        self.assertNotIn("mailto:samen_online@outlook.com", content, "mailto links with target email must not appear in static HTML")

    def test_schema_org_local_business_and_utrecht_geo(self):
        index_html = WORKSPACE / "out" / "index.html"
        content = index_html.read_text(encoding="utf-8")
        
        # Check structured JSON-LD schemas
        self.assertIn("application/ld+json", content, "JSON-LD schema tag must be present")
        self.assertIn("ProfessionalService", content, "ProfessionalService schema must be present")
        self.assertIn("LocalBusiness", content, "LocalBusiness schema must be present")
        self.assertIn("52.0907", content, "Utrecht latitude coordinate must be in schema")
        self.assertIn("5.1214", content, "Utrecht longitude coordinate must be in schema")
        self.assertIn("Utrecht", content, "Utrecht locality must be present")
        self.assertIn("FAQPage", content, "FAQPage schema must be present")

    def test_canonical_and_robots_sitemap(self):
        index_html = WORKSPACE / "out" / "index.html"
        content = index_html.read_text(encoding="utf-8")
        self.assertIn('rel="canonical"', content, "Canonical link tag must be present")
        
        sitemap = WORKSPACE / "out" / "sitemap.xml"
        self.assertTrue(sitemap.exists(), "sitemap.xml must exist in out/")
        sitemap_content = sitemap.read_text(encoding="utf-8")
        self.assertTrue("https://samenonline" in sitemap_content or "http" in sitemap_content, "Sitemap must reference URLs")

        robots = WORKSPACE / "out" / "robots.txt"
        self.assertTrue(robots.exists(), "robots.txt must exist in out/")
        robots_content = robots.read_text(encoding="utf-8")
        self.assertTrue("user-agent: *" in robots_content.lower(), "Robots.txt must allow crawlers")

    def test_tailwind_v4_dark_mode_tokens(self):
        globals_css = WORKSPACE / "app" / "globals.css"
        self.assertTrue(globals_css.exists(), "app/globals.css must exist")
        css_content = globals_css.read_text(encoding="utf-8")
        self.assertIn("@custom-variant dark", css_content, "Tailwind v4 @custom-variant dark must be defined")
        self.assertIn("#07090e", css_content, "Obsidian background token must be defined")

    def test_whatsapp_widget_opening_hours(self):
        widget_file = WORKSPACE / "src" / "components" / "WhatsAppWidget.tsx"
        self.assertTrue(widget_file.exists(), "WhatsAppWidget.tsx must exist")
        widget_content = widget_file.read_text(encoding="utf-8")
        self.assertIn("hour >= 9 && hour < 19", widget_content, "Opening hours must be gated between 09:00 and 19:00")
        # Ensure outdated placeholder phone numbers are not in widget
        self.assertNotIn("+31 6 12345678", widget_content, "Outdated placeholder phone number must not be present")

    def test_industry_demo_templates_exported(self):
        demo_dir = WORKSPACE / "out" / "demo"
        self.assertTrue(demo_dir.exists(), "out/demo directory must exist")
        demos = list(demo_dir.glob("*"))
        self.assertGreaterEqual(len(demos), 10, f"Expected at least 10 demo routes, found {len(demos)}")

if __name__ == "__main__":
    unittest.main()
