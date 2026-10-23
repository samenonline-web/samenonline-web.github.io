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

    # 34. FAQPage and BreadcrumbList Rich Snippets on City Pages
    def test_city_pages_faq_and_breadcrumb_schema(self):
        page_file = WORKSPACE / "app" / "locaties" / "[stad]" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("'@type': 'FAQPage'", content.replace('"', "'"))
        self.assertIn("'@type': 'BreadcrumbList'", content.replace('"', "'"))
        self.assertIn("combinedJsonLd", content)

    # 35. City Pages Featured Interactive Demos with city query parameters
    def test_city_pages_featured_demo_links(self):
        page_file = WORKSPACE / "app" / "locaties" / "[stad]" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("Populaire Live Website Demo", content)
        self.assertIn("/demo/${tmpl.id}?city=", content)
        self.assertIn("Live Testen", content)

    # 36. Google Snippet Previewer on City Pages with City Props
    def test_city_pages_google_snippet_previewer(self):
        page_file = WORKSPACE / "app" / "locaties" / "[stad]" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("GoogleSnippetPreviewer", content)
        self.assertIn("initialCity={city.name}", content)

        comp_file = WORKSPACE / "src" / "components" / "GoogleSnippetPreviewer.tsx"
        comp_content = comp_file.read_text(encoding="utf-8")
        self.assertIn("initialCity?: string", comp_content)

    # 37. Footer SEO Internal Link Mesh to Cities and Kennisbank
    def test_footer_seo_internal_links(self):
        footer_file = WORKSPACE / "src" / "components" / "Footer.tsx"
        content = footer_file.read_text(encoding="utf-8")
        self.assertIn("CITIES_DATA.map", content)
        self.assertIn("/locaties/${city.id}", content)
        self.assertIn("href=\"/kennisbank\"", content)
        self.assertIn("href=\"/kennisbank/waarom-nextjs-sneller-is-dan-wordpress\"", content)

    # 38. Bistro De Gracht Live Cart & Ordering Micro-App
    def test_bistro_de_gracht_cart_and_ordering(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "BistroDeGracht.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("addToCart", content)
        self.assertIn("totalCartCount", content)
        self.assertIn("handleCheckoutSimulator", content)
        self.assertIn("Test iDEAL 2.0 Checkout Simulator", content)

    # 39. BouwMeester Aannemer Calculator 2.0 with Quality Selector & Cost Split
    def test_bouwmeester_calculator_cost_split(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "BouwMeesterAannemer.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("finishQuality", content)
        self.assertIn("laborCost", content)
        self.assertIn("materialCost", content)
        self.assertIn("handlePrintQuote", content)

    # 40. Expanded Kennisbank with 10 In-depth SEO Articles
    def test_expanded_kennisbank_10_articles(self):
        articles_file = WORKSPACE / "src" / "data" / "articles.ts"
        content = articles_file.read_text(encoding="utf-8")
        self.assertIn("google-bedrijfsprofiel-en-maps-optimalisatie", content)
        self.assertIn("tco-vergelijking-wordpress-wix-vs-nextjs", content)
        self.assertIn("conversie-optimalisatie-voor-dienstverleners", content)
        self.assertIn("website-beveiliging-avg-gdpr-voor-ondernemers", content)
        self.assertIn("kleurpsychologie-en-typografie-voor-websites", content)

        # Count articles by slug occurrence
        slug_count = content.count("slug: '")
        self.assertEqual(slug_count, 10, f"Expected 10 articles, found {slug_count}")

    # 41. BreadcrumbList Schema on Kennisbank Article Detail Pages
    def test_kennisbank_article_breadcrumb_schema(self):
        page_file = WORKSPACE / "app" / "kennisbank" / "[slug]" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("'@type': 'BreadcrumbList'", content.replace('"', "'"))
        self.assertIn("breadcrumbJsonLd", content)

    # 42. StudioPuur Salon Booking Addons, Live Total, and Calendar Integration
    def test_studiopuur_salon_addons_and_total(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "StudioPuurSalon.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("ADDONS", content)
        self.assertIn("toggleAddon", content)
        self.assertIn("addonsTotal", content)
        self.assertIn("grandTotal", content)
        self.assertIn("Voeg toe aan Google / Apple Agenda", content)

    # 43. DuurzaamKledingShop E-Commerce Micro-App & iDEAL Checkout Simulator
    def test_duurzaam_kleding_shop_checkout_integration(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "DuurzaamKledingShop.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("onOpenIdealCheckout", content)
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("Afrekenen met iDEAL (Demo)", content)

    # 44. Mobile Sticky Bar Questionnaire Integration
    def test_mobile_sticky_bar_questionnaire_integration(self):
        bar_file = WORKSPACE / "src" / "components" / "MobileStickyBar.tsx"
        content = bar_file.read_text(encoding="utf-8")
        self.assertIn("onOpenQuestionnaire", content)
        self.assertIn("website-vragenlijst", content)
        self.assertIn("Keuzehulp", content)

    # 45. Interactive Kennisbank Search and Category Filter Component
    def test_kennisbank_interactive_search_and_filter(self):
        comp_file = WORKSPACE / "src" / "components" / "KennisbankFilterGrid.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("searchQuery", content)
        self.assertIn("selectedCategory", content)
        self.assertIn("filteredArticles", content)

        page_file = WORKSPACE / "app" / "kennisbank" / "page.tsx"
        page_content = page_file.read_text(encoding="utf-8")
        self.assertIn("KennisbankFilterGrid", page_content)

    # 46. Dedicated Website Vragenlijst / Keuzehulp Route & Structured Schema
    def test_dedicated_vragenlijst_route_and_schema(self):
        page_file = WORKSPACE / "app" / "vragenlijst" / "page.tsx"
        self.assertTrue(page_file.exists(), "app/vragenlijst/page.tsx must exist")
        content = page_file.read_text(encoding="utf-8")
        self.assertIn("https://samenonline-web.github.io/vragenlijst", content)
        self.assertIn("'@type': 'BreadcrumbList'", content.replace('"', "'"))
        self.assertIn("'@type': 'FAQPage'", content.replace('"', "'"))

        client_file = WORKSPACE / "src" / "components" / "VragenlijstPageClient.tsx"
        self.assertTrue(client_file.exists(), "VragenlijstPageClient.tsx must exist")
        client_content = client_file.read_text(encoding="utf-8")
        self.assertIn("WebsiteQuestionnaire", client_content)
        self.assertIn("RequestWebsiteModal", client_content)

        sitemap_file = WORKSPACE / "app" / "sitemap.ts"
        sitemap_content = sitemap_file.read_text(encoding="utf-8")
        self.assertIn("${baseUrl}/vragenlijst", sitemap_content)

        footer_file = WORKSPACE / "src" / "components" / "Footer.tsx"
        footer_content = footer_file.read_text(encoding="utf-8")
        self.assertIn('href="/vragenlijst"', footer_content)

    # 47. ZonnePionier Solar Calculator with City Props and Printable Specification
    def test_zonne_pionier_solar_calculator(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "ZonnePionierSolar.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("Bewaar Zonneplan", content)
        self.assertIn("runDakscan", content)

    # 48. Makelaardij Vastgoed Mortgage & Monthly Payment Calculator
    def test_makelaardij_mortgage_calculator(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "MakelaardijVastgoed.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("mortgagePrice", content)
        self.assertIn("mortgageSavings", content)
        self.assertIn("grossMonthlyPayment", content)
        self.assertIn("netMonthlyPayment", content)
        self.assertIn("Nationale Hypotheek Garantie (NHG)", content)

    # 49. Ambacht Bakkerij Demo iDEAL Checkout & City Props
    def test_ambacht_bakkerij_checkout_and_city(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "AmbachtBakkerijDemo.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("onOpenIdealCheckout", content)
        self.assertIn("Reservering Bevestigen met iDEAL", content)

    # 50. City Pages Direct Internal Links to /vragenlijst
    def test_city_pages_link_to_dedicated_vragenlijst(self):
        page_file = WORKSPACE / "app" / "locaties" / "[stad]" / "page.tsx"
        content = page_file.read_text(encoding="utf-8")
        self.assertIn('href="/vragenlijst"', content)

    # 51. ZorgMondKliniek NZa Tariff & Dental Insurance Calculator and Printable Dossiers
    def test_zorg_mond_kliniek_tariff_calculator(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "ZorgMondKliniek.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("selectedTariffCodes", content)
        self.assertIn("insuranceCoveragePct", content)
        self.assertIn("totalTariffCost", content)
        self.assertIn("estimatedOutOfPocket", content)
        self.assertIn("Print Afspraakbevestiging", content)
        self.assertIn("ZM-AFSPR-2026-X", content)
        self.assertIn("ZM-PAT-2026-X", content)
        self.assertIn("Print Inschrijfbewijs (PDF)", content)

    # 52. RijschoolVlot Installment Calculator and Printable Voucher
    def test_rijschool_vlot_installment_and_voucher(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "RijschoolVlot.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("installmentCount", content)
        self.assertIn("Termijnbetaling Calculator", content)
        self.assertIn("Print Proefles Voucher", content)
        self.assertIn("VLT-2026-PROEF", content)
        self.assertIn("0% Rente & Geen BKR Registratie", content)

    # 53. GlansHelderSchoonmaak Printable Workprogram and Tariff Calculator
    def test_glanshelder_workprogram_calculator(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "GlansHelderSchoonmaak.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("showWorkPlan", content)
        self.assertIn("GH-SPEC-2026", content)
        self.assertIn("Print Werkprogramma (PDF)", content)
        self.assertIn("VSR-KMS normering", content)

    # 54. FietsCraft Configurator City Props, WKR Lease Breakdown, and Printable Spec
    def test_fietscraft_configurator_city_and_lease(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "FietsCraftConfigurator.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("Zakelijke Lease & WKR Fietsplan", content)
        self.assertIn("Print Specificatie", content)

    # 55. DeVriesBoekhouding Tax Deduction Breakdown & Printable Intake Voucher
    def test_devries_boekhouding_tax_and_voucher(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "DeVriesBoekhouding.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("meetsHourCriterion", content)
        self.assertIn("hasStarterDeduction", content)
        self.assertIn("DV-FISC-2026-INTAKE", content)
        self.assertIn("Print Afspraakbevestiging & Checklist", content)

    # 56. AdvocatenKantoorJustitia Transitievergoeding Calculator & NOvA Dossier Voucher
    def test_justitia_advocaten_calculator_and_dossier(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "AdvocatenKantoorJustitia.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("transitievergoeding", content)
        self.assertIn("yearsEmployed", content)
        self.assertIn("monthlySalary", content)
        self.assertIn("JUST-DOS-2026-X", content)
        self.assertIn("Print Dossierbewijs (PDF)", content)

    # 57. DierenkliniekDeVennen Pet Health Plan Calculator & Printable Consult Voucher
    def test_dierenkliniek_zorgplan_and_voucher(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "DierenkliniekDeVennen.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("zorgPlanPrice", content)
        self.assertIn("zorgPlanSavings", content)
        self.assertIn("VET-VEN-2026-X", content)
        self.assertIn("Print Afspraakkaart (PDF)", content)

    # 58. KrachtLijnGym Billing Switcher, Student Discount, and Printable Gym Pass
    def test_krachtlijn_gym_membership_and_pass(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "KrachtLijnGym.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("billingCycle", content)
        self.assertIn("isStudent", content)
        self.assertIn("Studentenkorting (-20%)", content)
        self.assertIn("KL-PASS-2026", content)
        self.assertIn("Print 7-Dagen Gym Pas (PDF)", content)

    # 59. StadskliniekFysio City Props, Printable Behandelpas, and Insurance Section
    def test_stadskliniek_fysio_pass_and_insurance(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "StadskliniekFysio.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("SF-FYSIO-2026-X", content)
        self.assertIn("Print Behandelpas (PDF)", content)
        self.assertIn("Zorgvergoeding & Declaratie 2026", content)

    # 60. VersVogelBoerderij City Props & Printable Oogstbon Voucher
    def test_versvogel_boerderij_city_and_voucher(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "VersVogelBoerderij.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("Print Oogstbon (PDF)", content)
        self.assertIn("Gratis gekoelde bezorging in", content)

    # 61. LensVerhaalFotografie Shoot Calculator, Cinema Drone Upgrade, and Printable Draaiboek
    def test_lensverhaal_fotografie_calculator_and_draaiboek(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "LensVerhaalFotografie.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("includeDroneVideo", content)
        self.assertIn("includeSecondShooter", content)
        self.assertIn("includeLinenAlbum", content)
        self.assertIn("Print Draaiboek (PDF)", content)
        self.assertIn("Stel Jouw Ideale Fotosessie Samen", content)

    # 62. InktEnNaaldStudio Tattoo Price & Duration Estimator and Printable Intake Dossier
    def test_inkt_en_naald_calculator_and_dossier(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "InktEnNaaldStudio.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("minEstPrice", content)
        self.assertIn("maxEstPrice", content)
        self.assertIn("calcSize", content)
        self.assertIn("calcDetail", content)
        self.assertIn("INKT-EIN-2026-X", content)
        self.assertIn("Print Intakebon (PDF)", content)
        self.assertIn("Tattoo Richtprijs & Sessieduur Rekenmodule", content)

    # 63. PlanBasisHRSaaS HR ROI & Efficiency Calculator and Printable Trial Dossier
    def test_planbasis_hr_saas_calculator_and_dossier(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "PlanBasisHRSaaS.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("annualManualPlanningsCost", content)
        self.assertIn("netAnnualSavings", content)
        self.assertIn("plannerHourlyRate", content)
        self.assertIn("planningHoursPerWeek", content)
        self.assertIn("PB-TRIAL-2026-X", content)
        self.assertIn("Print Licentie & Onboarding Dossier (PDF)", content)
        self.assertIn("Bereken Jouw Jaarlijkse HR & Tijdwinst Besparing", content)

    # 64. StroomDelenSaaS City Props, Smart Grid Module, and Printable Energiepaspoort
    def test_stroomdelen_saas_grid_and_energiepaspoort(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "StroomDelenSaaS.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("customBrandName", content)
        self.assertIn("customCity", content)
        self.assertIn("gridConnectSuccess", content)
        self.assertIn("SD-GRID-2026-X", content)
        self.assertIn("Print Netkoppeling & Energiepaspoort (PDF)", content)
        self.assertIn("Activeer Jouw Netkoppeling in", content)

    # 65. ZonnePionierSolar Dakscan Simulator, Scope 12, and Printable Zonneplan Dossier
    def test_zonnepionier_solar_simulator_and_dossier(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "ZonnePionierSolar.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("showDossier", content)
        self.assertIn("ZP-DAK-2026-X", content)
        self.assertIn("Print Zonneplan Dossier (PDF)", content)
        self.assertIn("Officiële Dakscan & Investeringsraming", content)
        self.assertIn("Scope 12 & InstallQ", content)

    # 66. BouwMeesterAannemer M2 Estimator, BouwGarant, and Printable Specification Dossier
    def test_bouwmeester_aannemer_estimator_and_dossier(self):
        comp_file = WORKSPACE / "src" / "components" / "templates" / "BouwMeesterAannemer.tsx"
        content = comp_file.read_text(encoding="utf-8")
        self.assertIn("showDossier", content)
        self.assertIn("BM-BOUW-2026-X", content)
        self.assertIn("Print Verbouw Specificatie (PDF)", content)
        self.assertIn("BouwGarant Richtprijs & Specificatie Dossier", content)
        self.assertIn("BouwGarant & VCA**", content)

if __name__ == "__main__":
    unittest.main()
