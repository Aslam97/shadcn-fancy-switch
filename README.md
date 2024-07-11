<a href="https://shadcn-fancy-switch.vercel.app" target="_blank">
  <img src="https://i.imgur.com/szCHnuV.png" alt="React Fancy Switch" />
</a>

Simple Fancy Switch Component.

## Installation

Copy the `src/components/fancy-switch` directory and paste into your project and customize to your needs. The code is yours.

## Usage

```jsx
import React, { useState } from 'react'
import { FancySwitch } from '@/components/fancy-switch'

const options: string[] = ['Delivery', 'Pickup', 'Shipping']

export const App = () => {
  const [value, setValue] = useState<string>()

  return (
    <FancySwitch
      value={value}
      onChange={(value) => setValue(value)}
      options={options}
    />
  )
}
```
