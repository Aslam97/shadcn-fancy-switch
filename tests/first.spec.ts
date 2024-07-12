import { test, expect } from '@playwright/test'

test.describe('FancySwitch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders options', async ({ page }) => {
    const radiogroups = await page.getByTestId('orderType')
    const options = await radiogroups.getByRole('radio').all()

    await expect(options).toHaveLength(3)
    await expect(options[0]).toHaveText('Delivery')
    await expect(options[1]).toHaveText('Pickup')
    await expect(options[2]).toHaveText('Shipping')
  })

  test('selects option on click', async ({ page }) => {
    const radiogroups = await page.getByTestId('orderType')
    const secondOption = await radiogroups.getByRole('radio').nth(1)
    await secondOption.click()
    await expect(secondOption).toHaveAttribute('aria-checked', 'true')
  })

  test('changes selection with arrow keys', async ({ page }) => {
    const firstOption = await page.locator('[role="radio"]').nth(0)
    await firstOption.focus()
    await page.keyboard.press('ArrowRight')

    const secondOption = await page.locator('[role="radio"]').nth(1)
    await expect(secondOption).toHaveAttribute('aria-checked', 'true')
  })

  test('highlighter moves to selected option', async ({ page }) => {
    const radiogroups = await page.getByTestId('orderType')
    const secondOption = await radiogroups.getByRole('radio').nth(1)
    await secondOption.click()

    const highlighter = await radiogroups.locator('[data-highlighter]')
    const optionBox = await secondOption.boundingBox()

    // get second option margin
    const margin = await secondOption.evaluate((el) => {
      const { marginTop, marginBottom, marginLeft, marginRight } =
        getComputedStyle(el)
      return {
        marginTop,
        marginBottom,
        marginLeft,
        marginRight
      }
    })

    // wait for the highlighter to move
    await page.waitForTimeout(500)

    const newHighlighterBox = await highlighter.boundingBox()
    if (newHighlighterBox && optionBox) {
      expect(newHighlighterBox.width).toBeCloseTo(
        optionBox.width +
          parseInt(margin.marginLeft) +
          parseInt(margin.marginRight)
      )
    }
  })
})
