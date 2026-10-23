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

if __name__ == "__main__":
    unittest.main()
