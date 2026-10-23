import os
import re
import json
import unittest
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent

class TestSamenOnlineVerification(unittest.TestCase):
    # 1. Output build directory & HTML exists
    def test_out_directory_and_index_exist(self):
        index_html = WORKSPACE / "out" / "index.html"
        self.assertTrue(index_html.exists(), "out/index.html must exist after static build")
        self.assertGreater(index_html.stat().st_size, 1000, "out/index.html should have substantial content")

    # 2. Email bot shielding
    def test_bot_shielding_no_plaintext_email_in_static_html(self):
        index_html = WORKSPACE / "out" / "index.html"
        content = index_html.read_text(encoding="utf-8")
        self.assertNotIn("samen_online@outlook.com", content, "Email must be bot-shielded and never appear in static HTML")
        self.assertNotIn("mailto:samen_online@outlook.com", content, "mailto links with target email must not appear in static HTML")

    # 3. Schema.org LocalBusiness & geo data
    def test_schema_org_local_business_and_utrecht_geo(self):
        index_html = WORKSPACE / "out" / "index.html"
        content = index_html.read_text(encoding="utf-8")
        self.assertIn("application/ld+json", content, "JSON-LD schema tag must be present")
        self.assertIn("ProfessionalService", content, "ProfessionalService schema must be present")
        self.assertIn("LocalBusiness", content, "LocalBusiness schema must be present")
        self.assertIn("52.0907", content, "Utrecht latitude coordinate must be in schema")
        self.assertIn("5.1214", content, "Utrecht longitude coordinate must be in schema")
        self.assertIn("Utrecht", content, "Utrecht locality must be present")
        self.assertIn("FAQPage", content, "FAQPage schema must be present")

    # 4. Canonical & sitemap/robots
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

    # 5. Tailwind tokens
    def test_tailwind_v4_dark_mode_tokens(self):
        globals_css = WORKSPACE / "app" / "globals.css"
        self.assertTrue(globals_css.exists(), "app/globals.css must exist")
        css_content = globals_css.read_text(encoding="utf-8")
        self.assertIn("@custom-variant dark", css_content, "Tailwind v4 @custom-variant dark must be defined")
        self.assertIn("#07090e", css_content, "Obsidian background token must be defined")

    # 6. WhatsApp widget
    def test_whatsapp_widget_opening_hours(self):
        widget_file = WORKSPACE / "src" / "components" / "WhatsAppWidget.tsx"
        self.assertTrue(widget_file.exists(), "WhatsAppWidget.tsx must exist")
        widget_content = widget_file.read_text(encoding="utf-8")
        self.assertIn("hour >= 9 && hour < 19", widget_content, "Opening hours must be gated between 09:00 and 19:00")
        self.assertNotIn("+31 6 12345678", widget_content, "Outdated placeholder phone number must not be present")

    # 7. Demo routes exported
    def test_industry_demo_templates_exported(self):
        demo_dir = WORKSPACE / "out" / "demo"
        self.assertTrue(demo_dir.exists(), "out/demo directory must exist")
        demos = list(demo_dir.glob("*"))
        self.assertGreaterEqual(len(demos), 10, f"Expected at least 10 demo routes, found {len(demos)}")

    # 8. Interactive Construction Calculator
    def test_interactive_construction_calculator_file_and_exports(self):
        f = WORKSPACE / "src" / "components" / "demos" / "InteractiveConstructionCalculator.tsx"
        self.assertTrue(f.exists(), "InteractiveConstructionCalculator.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("InteractiveConstructionCalculator", content)
        self.assertIn("m²", content)
        self.assertIn("Dakkapel", content)
        self.assertIn("Uitbouw", content)

    # 9. Interactive Menu & Table Reservation
    def test_interactive_menu_reservation_file_and_exports(self):
        f = WORKSPACE / "src" / "components" / "demos" / "InteractiveMenuReservation.tsx"
        self.assertTrue(f.exists(), "InteractiveMenuReservation.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("InteractiveMenuReservation", content)
        self.assertIn("Bestelling", content)
        self.assertIn("Reservering", content)

    # 10. Interactive Appointment Booking
    def test_interactive_appointment_booking_file_and_exports(self):
        f = WORKSPACE / "src" / "components" / "demos" / "InteractiveAppointmentBooking.tsx"
        self.assertTrue(f.exists(), "InteractiveAppointmentBooking.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("InteractiveAppointmentBooking", content)
        self.assertIn("Behandeling", content)
        self.assertIn("Stylist", content)

    # 11. Interactive Webshop Checkout
    def test_interactive_webshop_checkout_file_and_exports(self):
        f = WORKSPACE / "src" / "components" / "demos" / "InteractiveWebshopCheckout.tsx"
        self.assertTrue(f.exists(), "InteractiveWebshopCheckout.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("InteractiveWebshopCheckout", content)
        self.assertIn("iDEAL", content)
        self.assertIn("Winkelmand", content)
        self.assertIn("Rabobank", content)

    # 12. Interactive Demo Playground wiring
    def test_interactive_demo_playground_wiring(self):
        f = WORKSPACE / "src" / "components" / "InteractiveDemoPlayground.tsx"
        self.assertTrue(f.exists(), "InteractiveDemoPlayground.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("InteractiveConstructionCalculator", content)
        self.assertIn("InteractiveMenuReservation", content)
        self.assertIn("InteractiveAppointmentBooking", content)
        self.assertIn("InteractiveWebshopCheckout", content)

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("InteractiveDemoPlayground", page_content, "Playground must be rendered on homepage")

    # 13. Google Snippet Previewer file & wiring
    def test_google_snippet_previewer_file_and_wiring(self):
        f = WORKSPACE / "src" / "components" / "GoogleSnippetPreviewer.tsx"
        self.assertTrue(f.exists(), "GoogleSnippetPreviewer.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("Google SERP Simulatie", content)
        self.assertIn("Kopieer Meta Tags", content)
        self.assertIn("LocalBusiness", content)

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("GoogleSnippetPreviewer", page_content, "GoogleSnippetPreviewer must be wired into app/page.tsx")

    # 14. Lost Customer Calculator benchmarks
    def test_lost_customer_calculator_file_and_benchmarks(self):
        f = WORKSPACE / "src" / "components" / "LostCustomerCalculator.tsx"
        self.assertTrue(f.exists(), "LostCustomerCalculator.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("Omzetverlies & Afhaak Calculator", content)
        self.assertIn("53%", content)
        self.assertIn("Terugverdientijd redesign", content)

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("LostCustomerCalculator", page_content, "LostCustomerCalculator must be wired into app/page.tsx")

    # 15. Client Portal Simulator 5-Day Workflow
    def test_client_portal_simulator_5_day_workflow(self):
        f = WORKSPACE / "src" / "components" / "ClientPortalSimulator.tsx"
        self.assertTrue(f.exists(), "ClientPortalSimulator.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("5-Dagen Oplever-Simulator", content)
        self.assertIn("Intake & Directe Kick-off", content)
        self.assertIn("Eerste Werkende Live-Versie", content)
        self.assertIn("Kosteloze Revisieronde", content)
        self.assertIn("Domein, E-mail & Koppelingen", content)
        self.assertIn("100% Eigendomsoverdracht & Livegang", content)

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("ClientPortalSimulator", page_content, "ClientPortalSimulator must be wired into app/page.tsx")

    # 16. Website Copilot Widget file and wiring
    def test_website_copilot_widget_file_and_wiring(self):
        f = WORKSPACE / "src" / "components" / "WebsiteCopilotWidget.tsx"
        self.assertTrue(f.exists(), "WebsiteCopilotWidget.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("Website Copilot", content)
        self.assertIn("QUICK_CHIPS", content)
        self.assertIn("wa.me/31636481054", content)

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("WebsiteCopilotWidget", page_content, "WebsiteCopilotWidget must be wired into app/page.tsx")

    # 17. Local SEO City Hub with 12 cities & geo
    def test_local_seo_city_hub_12_cities_and_geo(self):
        f = WORKSPACE / "src" / "components" / "LocalSeoCityHub.tsx"
        self.assertTrue(f.exists(), "LocalSeoCityHub.tsx must exist")
        content = f.read_text(encoding="utf-8")
        self.assertIn("GeoCoordinates", content)
        self.assertIn("areaServed", content)

        data_file = WORKSPACE / "src" / "data" / "cities.ts"
        self.assertTrue(data_file.exists(), "src/data/cities.ts must exist")
        data_content = data_file.read_text(encoding="utf-8")
        cities = ["Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Breda", "Nijmegen", "Amersfoort", "Almere", "Arnhem"]
        for c in cities:
            self.assertIn(c, data_content, f"cities.ts must contain {c}")

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("LocalSeoCityHub", page_content, "LocalSeoCityHub must be wired into app/page.tsx")

    # 18. Printable Modal Isolation Rule (prevents the 31-page print bug)
    def test_printable_modal_isolation_rule(self):
        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn('id="app-screen-content"', page_content)
        self.assertIn('print:hidden', page_content)

        calc_file = WORKSPACE / "src" / "components" / "PriceEstimatorCalculator.tsx"
        calc_content = calc_file.read_text(encoding="utf-8")
        self.assertIn('<QuotePdfModal', calc_content)

        modal_file = WORKSPACE / "src" / "components" / "QuotePdfModal.tsx"
        modal_content = modal_file.read_text(encoding="utf-8")
        self.assertIn("printable-modal-root", modal_content)
        self.assertIn("printable-modal-card", modal_content)

    # 19. Quote PDF instant text download support
    def test_quote_pdf_modal_txt_download_support(self):
        modal_file = WORKSPACE / "src" / "components" / "QuotePdfModal.tsx"
        modal_content = modal_file.read_text(encoding="utf-8")
        self.assertIn("handleDownloadTxt", modal_content, "QuotePdfModal must support instant .txt download")
        self.assertIn("Download (.txt)", modal_content)

    # 20. iDEAL Simulator QR & Bunq support
    def test_ideal_simulator_modal_qr_and_bunq_support(self):
        modal_file = WORKSPACE / "src" / "components" / "IdealSimulatorModal.tsx"
        modal_content = modal_file.read_text(encoding="utf-8")
        self.assertIn("bunq", modal_content, "bunq must be in Dutch banks list")
        self.assertIn("Scan QR-Code", modal_content, "QR code simulation tab must be present")
        self.assertIn("Simuleer Mobiele QR Scan", modal_content)

    # 21. No unregistered / fake KvK number rule
    def test_no_unregistered_kvk_number(self):
        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        footer_file = WORKSPACE / "src" / "components" / "Footer.tsx"
        footer_content = footer_file.read_text(encoding="utf-8")
        self.assertNotIn("KVK: 12345678", page_content)
        self.assertNotIn("KVK: 12345678", footer_content)
        self.assertNotIn("KvK-nummer", footer_content)

    # 22. Copyright year is dynamic or 2026
    def test_copyright_year_2026(self):
        footer_file = WORKSPACE / "src" / "components" / "Footer.tsx"
        footer_content = footer_file.read_text(encoding="utf-8")
        self.assertIn("new Date().getFullYear()", footer_content, "Footer must dynamically output current year")
        self.assertIn("Samen Online", footer_content)

    # 23. Mobile responsive viewport meta
    def test_mobile_responsive_viewport_meta(self):
        index_html = WORKSPACE / "out" / "index.html"
        self.assertTrue(index_html.exists(), "out/index.html must exist")
        content = index_html.read_text(encoding="utf-8")
        self.assertIn("viewport", content.lower())
        self.assertIn("width=device-width", content.lower())

    # 24. Templates data integrity (at least 30+ templates)
    def test_templates_data_integrity_count(self):
        templates_file = WORKSPACE / "src" / "data" / "templates.ts"
        content = templates_file.read_text(encoding="utf-8")
        id_matches = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
        self.assertGreaterEqual(len(id_matches), 30, f"Expected >= 30 templates in catalog, found {len(id_matches)}")

    # 25. Speed guarantee & 5-day delivery present
    def test_fast_delivery_guarantee_present(self):
        page_file = WORKSPACE / "app" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("72-Uur Spoedservice", content)
        self.assertIn("5-Dagen", content)

    # 26. Zero broken relative imports in components
    def test_zero_broken_relative_links_in_components(self):
        components_dir = WORKSPACE / "src" / "components"
        for p in components_dir.rglob("*.tsx"):
            text = p.read_text(encoding="utf-8")
            self.assertNotIn("from '../../components/", text, f"Malformed relative import in {p.name}")

    # 27. Icon & Favicon SVG exists
    def test_manifest_or_favicon_svg_exists(self):
        icon_file = WORKSPACE / "app" / "icon.svg"
        self.assertTrue(icon_file.exists(), "app/icon.svg must exist for browser tabs and mobile bookmarking")

    # 28. Website Questionnaire & Copilot Intake Flow
    def test_website_questionnaire_and_copilot_intake(self):
        q_file = WORKSPACE / "src" / "components" / "WebsiteQuestionnaire.tsx"
        self.assertTrue(q_file.exists(), "WebsiteQuestionnaire.tsx must exist")
        q_content = q_file.read_text(encoding="utf-8")
        self.assertIn("WebsiteQuestionnaire", q_content)
        self.assertIn("Vind Jouw Ideale Website in 5 Vragen", q_content)
        self.assertIn("website-vragenlijst", q_content)

        page_file = WORKSPACE / "app" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("<WebsiteQuestionnaire", page_content)

        copilot_file = WORKSPACE / "src" / "components" / "WebsiteCopilotWidget.tsx"
        copilot_content = copilot_file.read_text(encoding="utf-8")
        self.assertNotIn("Bespreken via WhatsApp met Kenan", copilot_content)
        self.assertIn("Start Keuzehulp Vragenlijst", copilot_content)

    # 29. 12 Dedicated Static Location Routes & Sitemap Coverage
    def test_location_city_pages_and_sitemap(self):
        page_file = WORKSPACE / "app" / "locaties" / "[stad]" / "page.tsx"
        self.assertTrue(page_file.exists(), "app/locaties/[stad]/page.tsx must exist")
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("generateStaticParams", content)
        self.assertIn("generateMetadata", content)
        self.assertIn("CITIES_DATA", content)
        self.assertIn("ProfessionalService", content)
        self.assertIn("schema.org", content)

        sitemap_file = WORKSPACE / "app" / "sitemap.ts"
        sitemap_content = sitemap_file.read_text(encoding="utf-8")
        self.assertIn("/locaties/", sitemap_content)
        self.assertIn("CITIES_DATA", sitemap_content)

    # 30. Web App Manifest (PWA mobile installability)
    def test_manifest_ts_route(self):
        m_file = WORKSPACE / "app" / "manifest.ts"
        self.assertTrue(m_file.exists(), "app/manifest.ts must exist for PWA")
        content = m_file.read_text(encoding="utf-8")
        self.assertIn("Samen Online", content)
        self.assertIn("standalone", content)
        self.assertIn("theme_color", content)

    # 31. Kennisbank & In-depth SEO Articles
    def test_kennisbank_hub_and_article_routes(self):
        kb_page = WORKSPACE / "app" / "kennisbank" / "page.tsx"
        self.assertTrue(kb_page.exists(), "app/kennisbank/page.tsx must exist")
        kb_content = kb_page.read_text(encoding="utf-8")
        self.assertIn("ARTICLES_DATA", kb_content)

        art_page = WORKSPACE / "app" / "kennisbank" / "[slug]" / "page.tsx"
        self.assertTrue(art_page.exists(), "app/kennisbank/[slug]/page.tsx must exist")
        art_content = art_page.read_text(encoding="utf-8")
        self.assertIn("generateStaticParams", art_content)
        self.assertIn("generateMetadata", art_content)
        self.assertIn("@type': 'Article'", art_content.replace('"', "'"))

        data_file = WORKSPACE / "src" / "data" / "articles.ts"
        self.assertTrue(data_file.exists(), "src/data/articles.ts must exist")
        data_content = data_file.read_text(encoding="utf-8")
        self.assertIn("waarom-nextjs-sneller-is-dan-wordpress", data_content)
        self.assertIn("wat-kost-een-website-laten-maken-in-2026", data_content)

        sitemap_file = WORKSPACE / "app" / "sitemap.ts"
        sitemap_content = sitemap_file.read_text(encoding="utf-8")
        self.assertIn("/kennisbank", sitemap_content)
        self.assertIn("ARTICLES_DATA", sitemap_content)

    # 32. City Pages Local FAQ, Reviews & Districts
    def test_city_pages_local_faq_and_reviews(self):
        page_file = WORKSPACE / "app" / "locaties" / "[stad]" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("city.districts", content)
        self.assertIn("city.review", content)
        self.assertIn("city.localFaqs", content)
        self.assertIn("Geverifieerde Klant in", content)

        data_file = WORKSPACE / "src" / "data" / "cities.ts"
        data_content = data_file.read_text(encoding="utf-8")
        self.assertIn("districts:", data_content)
        self.assertIn("localFaqs:", data_content)
        self.assertIn("review:", data_content)

    # 33. WCAG Modal Accessibility & Keyboard Escape Handlers
    def test_modal_wcag_accessibility_attributes(self):
        pdf_modal = WORKSPACE / "src" / "components" / "QuotePdfModal.tsx"
        pdf_content = pdf_modal.read_text(encoding="utf-8")
        self.assertIn('role="dialog"', pdf_content)
        self.assertIn('aria-modal="true"', pdf_content)
        self.assertIn("e.key === 'Escape'", pdf_content)

        ideal_modal = WORKSPACE / "src" / "components" / "IdealSimulatorModal.tsx"
        ideal_content = ideal_modal.read_text(encoding="utf-8")
        self.assertIn('role="dialog"', ideal_content)
        self.assertIn('aria-modal="true"', ideal_content)
        self.assertIn("e.key === 'Escape'", ideal_content)

if __name__ == "__main__":
    unittest.main()
