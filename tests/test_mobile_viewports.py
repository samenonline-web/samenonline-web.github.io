import unittest
from playwright.sync_api import sync_playwright

class TestMobileViewports(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        # Use chromium headless
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def test_homepage_no_horizontal_overflow_375px(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        # Check document overflow
        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow detected at 375px: scrollWidth={scroll_width}, innerWidth={inner_width}")
        context.close()

    def test_homepage_no_horizontal_overflow_390px(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow detected at 390px: scrollWidth={scroll_width}, innerWidth={inner_width}")
        context.close()

    def test_homepage_no_horizontal_overflow_412px(self):
        context = self.browser.new_context(viewport={"width": 412, "height": 915})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow detected at 412px: scrollWidth={scroll_width}, innerWidth={inner_width}")
        context.close()

    def test_questionnaire_interactive_flow_on_mobile(self):
        context = self.browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()
        page.goto("http://localhost:3000", wait_until="networkidle")

        q_section = page.locator("#website-vragenlijst")
        self.assertTrue(q_section.is_visible(), "Website questionnaire section must be visible on mobile")

        # Click next question
        next_btn = q_section.locator("button:has-text('Volgende Vraag')")
        if next_btn.is_visible():
            next_btn.click()
            page.wait_for_timeout(300)
            self.assertIn("Stap 2", q_section.text_content(), "Step 2 should be reached on clicking next")

        context.close()

    def test_location_page_responsive_375px(self):
        context = self.browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()
        page.goto("http://localhost:3000/locaties/amsterdam", wait_until="networkidle")

        scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
        inner_width = page.evaluate("() => window.innerWidth")
        self.assertLessEqual(scroll_width, inner_width + 1, f"Horizontal overflow detected on /locaties/amsterdam at 375px: scrollWidth={scroll_width}")

        h1_text = page.locator("h1").text_content()
        self.assertIn("Amsterdam", h1_text)
        context.close()

if __name__ == "__main__":
    unittest.main()
