import { FancySwitch } from '@/components/fancy-switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cn } from './lib/utils'

const options: string[] = ['Delivery', 'Pickup', 'Shipping']

const FormSchema = z.object({
  option: z.string().min(1, {
    message: 'Option is required'
  })
})

function App() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      option: options[0]
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen place-items-center justify-center bg-white p-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            Fancy Switch
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <a
                href="https://github.com/Aslam97/shadcn-fancy-switch"
                className="font-semibold text-primary"
              >
                View on Github <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="option"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Username</FormLabel>
                  <FormControl>
                    <FancySwitch
                      {...field}
                      options={options}
                      className={cn(
                        'w-full',
                        form.formState.errors.option &&
                          'rounded-full border border-destructive'
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default App
