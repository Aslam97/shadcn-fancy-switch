import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FancySwitchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string | null
  onChange?: (value: string) => void
  options: string[]
  radioClassName?: string
  activeClassName?: string
}

export type OptionRefs = {
  [key: string]: HTMLDivElement | null
}

const FancySwitch = React.forwardRef<HTMLDivElement, FancySwitchProps>(
  (
    {
      options,
      value,
      onChange,
      radioClassName,
      activeClassName,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = React.useState(
      value ?? options[0]
    )
    const [highlighterStyle, setHighlighterStyle] = React.useState({
      height: 0,
      width: 0,
      transform: 'translateX(0)'
    })
    const containerRef = React.useRef<HTMLDivElement>(null)
    const optionRefs = React.useRef<OptionRefs>({})

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    const updateToggle = React.useCallback(() => {
      const selectedElement = optionRefs.current[selectedOption]

      if (selectedElement && containerRef.current) {
        const cr = containerRef.current.getBoundingClientRect()
        const sr = selectedElement.getBoundingClientRect()

        const ccs = window.getComputedStyle(containerRef.current)
        const scs = window.getComputedStyle(selectedElement)

        // margin not needed for the container
        const cpl = parseFloat(ccs.paddingLeft)
        const cbl = parseFloat(ccs.borderLeftWidth)

        // handle margin for the selected element
        const sml = parseFloat(scs.marginLeft)
        const smr = parseFloat(scs.marginRight)

        const translateX = sr.left - cr.left - cpl - cbl - sml

        setHighlighterStyle({
          height: sr.height,
          width: sr.width + sml + smr,
          transform: `translateX(${translateX}px)`
        })
      }
    }, [selectedOption])

    React.useEffect(() => {
      updateToggle()
    }, [selectedOption, updateToggle])

    const handleOptionChange = (option: string) => {
      setSelectedOption(option)
      if (onChange) onChange(option)
    }

    return (
      <div
        className={cn('rounded-full bg-muted p-2', className)}
        ref={containerRef}
        {...props}
      >
        <div className="relative inline-flex">
          <div
            className={cn(
              'absolute rounded-full bg-primary transition-all duration-300',
              activeClassName
            )}
            style={highlighterStyle}
          />
          {options.map((option) => (
            <div
              role="radio"
              aria-checked={selectedOption === option}
              aria-label={option}
              tabIndex={0}
              key={option}
              ref={(el) => {
                if (el) optionRefs.current[option] = el
              }}
              onClick={() => handleOptionChange(option)}
              className={cn(
                'relative flex h-9 cursor-pointer items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200',
                { 'text-primary-foreground': selectedOption === option },
                radioClassName
              )}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

FancySwitch.displayName = 'FancySwitch'

export { FancySwitch }
