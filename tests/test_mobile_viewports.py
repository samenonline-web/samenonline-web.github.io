import unittest
import socket
from playwright.sync_api import sync_playwright

def is_server_running(host="127.0.0.1", port=3000):
    try:
        with socket.create_connection((host, port), timeout=0.5):
            return True
    except OSError:
        return False

@unittest.skipUnless(is_server_running(), "Next.js dev/prod server on port 3000 is not running; skipping browser E2E tests")
class TestMobileViewports(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def test_01_homepage_no_horizontal_overflow_375px(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow at 375px: scrollWidth={scroll_width}")
        context.close()

    def test_02_homepage_no_horizontal_overflow_390px(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow at 390px: scrollWidth={scroll_width}")
        context.close()

    def test_03_homepage_no_horizontal_overflow_412px(self):
        context = self.browser.new_context(viewport={"width": 412, "height": 915})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow at 412px: scrollWidth={scroll_width}")
        context.close()

    def test_04_questionnaire_full_5_step_flow_and_recommendation(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        q_section = page.locator("#website-vragenlijst")
        self.assertTrue(q_section.is_visible(), "Website questionnaire section must be visible")

        # Step 1: Default is 'Horeca & Café'
        next_btn = q_section.locator("button:has-text('Volgende Vraag')")
        self.assertTrue(next_btn.is_visible())
        next_btn.click()
        page.wait_for_timeout(200)

        # Step 2: Goal selection
        next_btn.click()
        page.wait_for_timeout(200)

        # Step 3: Features selection
        next_btn.click()
        page.wait_for_timeout(200)

        # Step 4: Content status selection
        next_btn.click()
        page.wait_for_timeout(200)

        # Step 5: Finish button
        finish_btn = q_section.locator("button:has-text('Bekijk Mijn Persoonlijk Advies')")
        self.assertTrue(finish_btn.is_visible())
        finish_btn.click()
        page.wait_for_timeout(400)

        # Result card must now be visible with recommended package & price
        self.assertIn("Jouw Aanbevolen Website Oplossing", q_section.text_content())
        self.assertIn("Vaste Richtprijs", q_section.text_content())
        self.assertIn("€", q_section.text_content())
        context.close()

    def test_05_location_amsterdam_responsive_and_content(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000/locaties/amsterdam", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1)

        h1_text = page.locator("h1").text_content()
        self.assertIn("Amsterdam", h1_text)
        body_text = page.locator("body").text_content()
        self.assertIn("Centrum", body_text)
        self.assertIn("Geverifieerde Klant in Amsterdam", body_text)
        context.close()

    def test_06_location_rotterdam_faq_accordion_interaction(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000/locaties/rotterdam", wait_until="networkidle")

        # Click first FAQ accordion toggle
        first_faq_btn = page.locator("button:has-text('Hoe snel kan een website in Rotterdam')")
        if first_faq_btn.count() > 0:
            first_faq_btn.first.click()
            page.wait_for_timeout(200)
            self.assertIn("binnen 5 werkdagen", page.locator("body").text_content())
        context.close()

    def test_07_location_amersfoort_bouw_demo_preview(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000/locaties/amersfoort", wait_until="networkidle")

        # Find Bouw demo tab button and click it
        bouw_btn = page.locator("button:has-text('Bouw & Montage')")
        if bouw_btn.count() > 0:
            bouw_btn.first.click()
            page.wait_for_timeout(200)
            self.assertIn("Directe Richtprijs", page.locator("body").text_content())
        context.close()

    def test_08_kennisbank_index_responsive_and_links(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000/kennisbank", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1)

        body_text = page.locator("body").text_content()
        self.assertIn("Kennisbank", body_text)

        article_links = page.locator("a[href^='/kennisbank/']")
        self.assertGreaterEqual(article_links.count(), 5)
        context.close()

    def test_09_kennisbank_article_detail_and_reading(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000/kennisbank/waarom-nextjs-sneller-is-dan-wordpress", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1)

        h1_text = page.locator("h1").text_content()
        self.assertIn("Waarom Next.js", h1_text)

        # Check breadcrumb link back to Kennisbank
        breadcrumb = page.locator("a[href='/kennisbank']")
        self.assertTrue(breadcrumb.first.is_visible())
        context.close()

    def test_10_mobile_bottom_bar_present(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        # Scroll down 500px to trigger the sticky bottom bar
        page.evaluate("() => window.scrollTo(0, 500)")
        page.wait_for_timeout(300)

        bottom_bar = page.locator("aside[aria-label='Snelle mobiele acties']")
        self.assertTrue(bottom_bar.is_visible(), "Mobile bottom bar must be visible on 375px screen after scroll")
        context.close()

    def test_11_quote_pdf_modal_keyboard_escape(self):
        context = self.browser.new_context(viewport={"width": 1024, "height": 768})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        quote_btn = page.locator("button:has-text('Offerte Downloaden (PDF)')")
        if quote_btn.count() > 0:
            quote_btn.first.scroll_into_view_if_needed()
            quote_btn.first.click()
            page.wait_for_timeout(300)

            modal = page.locator("div[role='dialog'][aria-label='Offerte en Specificatie Document']")
            self.assertTrue(modal.is_visible(), "Quote modal should be visible")

            page.keyboard.press("Escape")
            page.wait_for_timeout(300)
            self.assertFalse(modal.is_visible(), "Quote modal should close after pressing Escape")

        context.close()

    def test_12_ideal_simulator_modal_keyboard_escape(self):
        context = self.browser.new_context(viewport={"width": 1024, "height": 768})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        ideal_btn = page.locator("button:has-text('Live iDEAL Testen')")
        if ideal_btn.count() > 0:
            ideal_btn.first.scroll_into_view_if_needed()
            ideal_btn.first.click()
            page.wait_for_timeout(300)

            modal = page.locator("div[role='dialog'][aria-label='iDEAL 2.0 Betaal Simulator']")
            self.assertTrue(modal.is_visible(), "iDEAL simulator modal should be visible")

            page.keyboard.press("Escape")
            page.wait_for_timeout(300)
            self.assertFalse(modal.is_visible(), "iDEAL modal should close after pressing Escape")

        context.close()

    def test_13_kennisbank_search_filtering(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000/kennisbank", wait_until="networkidle")

        search_input = page.locator("input[placeholder*='Zoek in 10 gidsen']")
        if search_input.count() > 0:
            self.assertTrue(search_input.first.is_visible())
            search_input.first.fill("Google")
            page.wait_for_timeout(200)

            # Check that results match query
            articles = page.locator("article")
            self.assertGreaterEqual(articles.count(), 1)
            self.assertLessEqual(articles.count(), 8)

        context.close()

    def test_14_dedicated_vragenlijst_mobile_flow_375px(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000/vragenlijst", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow at 375px on /vragenlijst: {scroll_width}")

        q_section = page.locator("#website-vragenlijst")
        self.assertTrue(q_section.is_visible())

        # Step 1: Click next
        next_btn = q_section.locator("button:has-text('Volgende Vraag')")
        self.assertTrue(next_btn.is_visible())
        next_btn.click()
        page.wait_for_timeout(150)

        # Step 2: Next
        next_btn.click()
        page.wait_for_timeout(150)

        # Step 3: Next
        next_btn.click()
        page.wait_for_timeout(150)

        # Step 4: Next
        next_btn.click()
        page.wait_for_timeout(150)

        # Step 5: Finish
        finish_btn = q_section.locator("button:has-text('Bekijk Mijn Persoonlijk Advies')")
        self.assertTrue(finish_btn.is_visible())
        finish_btn.click()
        page.wait_for_timeout(300)

        # Result card assertions
        text_content = q_section.text_content() or ""
        self.assertIn("Jouw Aanbevolen Website Oplossing", text_content)
        self.assertIn("SO-INTAKE-2026-", text_content)

        print_btn = q_section.locator("button:has-text('Print Intake Dossier (PDF)')")
        self.assertTrue(print_btn.is_visible(), "Print Intake Dossier button must be visible on 375px")

        copy_btn = q_section.locator("button:has-text('Kopieer Specificatie')")
        self.assertTrue(copy_btn.is_visible(), "Copy specification button must be visible on 375px")

        context.close()

    def test_15_questionnaire_url_prefilling_and_responsive_390px(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000/vragenlijst?stad=amsterdam&spoed=true&pakket=webshop", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow at 390px on prefilled /vragenlijst: {scroll_width}")

        q_section = page.locator("#website-vragenlijst")
        self.assertTrue(q_section.is_visible())

        # Advance through prefilled flow
        next_btn = q_section.locator("button:has-text('Volgende Vraag')")
        for _ in range(4):
            if next_btn.is_visible():
                next_btn.click()
                page.wait_for_timeout(100)

        finish_btn = q_section.locator("button:has-text('Bekijk Mijn Persoonlijk Advies')")
        if finish_btn.is_visible():
            finish_btn.click()
            page.wait_for_timeout(250)

            # Assert Amsterdam regional badge in results
            result_text = q_section.text_content() or ""
            self.assertIn("Regio Amsterdam", result_text)
            self.assertIn("Samen Webshop", result_text)

        context.close()

    def test_16_all_12_location_routes_load_without_horizontal_overflow_412px(self):
        context = self.browser.new_context(viewport={"width": 412, "height": 915})
        page = context.new_page()

        cities = [
            "amsterdam", "rotterdam", "den-haag", "utrecht", "eindhoven",
            "tilburg", "groningen", "breda", "nijmegen", "amersfoort", "almere", "arnhem"
        ]

        for city_id in cities:
            url = f"http://localhost:3000/locaties/{city_id}"
            res = page.goto(url, wait_until="domcontentloaded")
            self.assertIsNotNone(res)
            self.assertEqual(res.status, 200, f"Location route /locaties/{city_id} returned status {res.status}")

            scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
            inner_width = page.evaluate("() => window.innerWidth")
            self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow on /locaties/{city_id} at 412px: scrollWidth={scroll_width}")

            h1_text = page.locator("h1").first.text_content() or ""
            self.assertTrue(len(h1_text) > 0, f"h1 should not be empty on /locaties/{city_id}")

            # Check that Google Maps 3-Pack section is rendered
            maps_section = page.locator("text=Google Maps & 3-Pack Optimalisatie")
            self.assertTrue(maps_section.count() > 0, f"Google Maps section missing on /locaties/{city_id}")

        context.close()

    def test_17_kennisbank_article_responsive_and_questionnaire_routing(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        res = page.goto("http://localhost:3000/kennisbank/waarom-nextjs-sneller-is-dan-wordpress", wait_until="networkidle")
        self.assertIsNotNone(res)
        self.assertEqual(res.status, 200)

        # Assert no horizontal overflow at 375px iPhone SE
        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow on Kennisbank article at 375px: scrollWidth={scroll_width}")

        # Check questionnaire CTA button exists
        cta_btn = page.locator("a:has-text('Start Vragenlijst voor Dit Thema')")
        self.assertTrue(cta_btn.count() > 0, "Kennisbank CTA button for questionnaire missing")
        href = cta_btn.first.get_attribute("href") or ""
        self.assertIn("/vragenlijst?onderwerp=", href)
        context.close()

    def test_18_client_portal_persistence_and_agreement_modal(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        portal_sec = page.locator("#klantenportaal-simulator")
        self.assertTrue(portal_sec.count() > 0, "Client portal section must exist")

        # Click agreement trigger
        agreement_btn = page.locator("button:has-text('Bekijk & Print 5-Dagen Garantieovereenkomst')")
        self.assertTrue(agreement_btn.count() > 0, "Agreement trigger button must exist")
        agreement_btn.click()
        page.wait_for_timeout(300)

        # Verify modal content
        modal_header = page.locator("text=5-Dagen Samenwerkingsovereenkomst")
        self.assertTrue(modal_header.is_visible(), "Agreement modal should be visible")

        token_badge = page.locator("text=SO-GARANTIE-2026")
        self.assertTrue(token_badge.is_visible(), "Guarantee token badge should be visible")

        # Close modal
        close_btn = page.locator("button:has-text('Sluiten')")
        self.assertTrue(close_btn.is_visible())
        close_btn.click()
        page.wait_for_timeout(200)
        self.assertFalse(modal_header.is_visible(), "Modal should close on button click")
        context.close()

if __name__ == "__main__":
    unittest.main()
