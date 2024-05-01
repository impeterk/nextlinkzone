'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify-icon/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Cross1Icon,
  CrossCircledIcon,
  DotsVerticalIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import {
  createNewLink,
  createNewPage,
  deleteLink,
  deletePage,
  setHeaderColor,
} from '@/lib/actions';
import { ChangeEvent, FormEvent, ReactElement, ReactEventHandler, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { ImSpinner2 } from 'react-icons/im';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TbColorPicker, TbLinkPlus } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useDebounce } from '@uidotdev/usehooks';
import { CiPalette } from "react-icons/ci";
import { tailwindColors } from '@/lib/utils';

export function UserLink({
  href,
  name,
  icon,
}: {
  href: string;
  name: string;
  icon: string | null
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='relative'
    >
      <Button
        variant={'outline'}
        className='flex w-full items-center justify-center gap-4 p-6 text-xl'
        size={'lg'}
      >
        {icon && (
          <>
            <Icon icon={icon} className='text-3xl' />
          </>
        )}
        {name}
      </Button>
    </a>
  );
}

export function LinkDelete({ linkId }: { linkId: number }) {
  const router = useRouter();
  const deleteLinkWithId = deleteLink.bind(null, linkId);
  const [submitting, setSubmitting] = useState(false);
  async function handleDelete(e: FormEvent) {
    e.preventDefault();
    setSubmitting(!submitting);
    // await deleteLinkWithId()
    toast.promise(deleteLinkWithId(), {
      loading: 'Deleting...',
      success: 'Link has been deleted',
      error: 'Error',
    });
    router.refresh();
    setSubmitting(!submitting);
  }

  return (
    <form onSubmit={handleDelete} className='absolute right-0 top-px pr-px'>
      <Button
        variant='ghost'
        size='icon'
        className='size-12 hover:text-destructive'
        disabled={submitting}
      >
        <Cross1Icon className='size-6' />
      </Button>
    </form>
  );
}

export function PageCard({ name }: { name: string }) {
  const pathname = usePathname();
  return (
    <Link href={`/dashboard/pages/${name}`}>
      <Card
        className={clsx(
          'group  relative flex min-h-32 items-center justify-center opacity-50 hover:opacity-100',
          {
            'border-emerald-500 opacity-100 dark:border-emerald-400 ':
              pathname.split('/').at(-1) === name,
          }
        )}
      >
        <CardHeader>
          <CardTitle className='text-center text-xl'>{name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function NewPage() {
  const [message, dispatch] = useFormState(createNewPage, undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // @ts-ignore
    if (message?.success) {
      // @ts-ignore
      router.push(`/dashboard/pages/${message.pagename}`);
      setOpen(false)
    }
  }, [message, router]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-4 py-8 text-xl hover:border-emerald-500'
        >
          <PlusIcon className='size-6' />
          <span>New Page</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={dispatch}>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>Create your new unique page</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                placeholder='Cool Page Name'
                name='pagename'
                className='col-span-3'
              />
            </div>
            {message && (
              <div className='text-center text-destructive'>{message.text}</div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
              >
                Close
              </Button>
            </DialogClose>
            <NewPageSubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function NewPageSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending ? (
        <>
          <ImSpinner2 className='mr-2 size-5 animate-spin' />
          Loading...
        </>
      ) : (
        <>Create New Page</>
      )}
    </Button>
  );
}

export const newLinkSchema = z.object({
  name: z.string().min(2, {
    message: 'Display name must be at least 2 characters.',
  }),
  href: z.string().url({ message: 'Please provide a valid URL' }),
  pageId: z.string(),
  icon: z.string().optional(),
});

export function NewLink() {
  const [open, setOpen] = useState(false);
  const [searchIcon, setSearchIcon] = useState('');
  const [iconsList, setIconsList] = useState([]);
  const [linkIcon, setLinkIcon] = useState('');
  const [openList, setOpenList] = useState(false)

  const params = useParams();
  const router = useRouter();
  const debouncedSearchIcon = useDebounce(searchIcon, 300);

  const form = useForm<z.infer<typeof newLinkSchema>>({
    resolver: zodResolver(newLinkSchema),
    defaultValues: {
      pageId: params.page as string,
      href: '',
      name: '',
      icon: '',
    },
  });

  async function onSubmit(values: z.infer<typeof newLinkSchema>) {
    values.icon = linkIcon
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createNewLink(values);
    router.refresh();
    setOpen(!open);
    form.reset();
    setLinkIcon('')
    setIconsList([])
  }

  function handleIconChange(e: ChangeEvent<HTMLInputElement>) {
    let term = e.target.value;
    setSearchIcon(term);
  }

  // const {error, data} = useFetch(`https://api.iconify.design/search?query=${debouncedSearchIcon}`)

  useEffect(() => {
    async function getIcons() {
      const res = await fetch(
        `https://api.iconify.design/search?query=${debouncedSearchIcon}`
      );
      const { icons } = await res.json();
      if (icons.length > 0 && !openList) setOpenList(true)
      setIconsList(icons);
    }
    if (debouncedSearchIcon) {
      getIcons();
    }
    return () => {
      setIconsList([])
      setOpenList(false)
    }
  }, [debouncedSearchIcon]);

  function handleSelectIcon(icon:string) {
    setLinkIcon(icon)
    setOpenList(false)
  }

  function handleLinkIconClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    e.stopPropagation()
    if (iconsList.length > 0) setOpenList(!openList)
  }
  return (
    <footer className='mt-8'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='flex w-full items-center gap-4 py-6  text-xl'
          >
            <TbLinkPlus className='size-6' />
            <span className='font-light'>Create New Link</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Details</DialogTitle>
            <DialogDescription>
              Please provide link details to create new link
            </DialogDescription>
            <hr />
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='relative flex min-h-max flex-col items-center gap-8 md:flex-row'
            >
              <FormField
                name='IconSearch'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <div className='relative flex gap-2'>
                        <Button
                          variant='outline'
                          type='button'
                          size='icon'
                          className='shrink-0'
                          onClick={handleLinkIconClick}
                        >
                          <Icon icon={linkIcon} />
                        </Button>
                        <Card className='absolute left-2 top-0 translate-y-12 grid w-max grid-cols-12 gap-px'>
                          {(openList && iconsList.length > 0) &&
                            iconsList.map((icon) => (
                              <Button variant="ghost" size="icon" type="button"  
                              key={icon}
                              value={icon}
                              onClick={() => {handleSelectIcon(icon)}}
                              asChild
                              >

                              <Icon
                              icon={icon}
                              className='text-xl'
                              value={icon}
                              />
                              </Button>
                            ))}
                        </Card>
                        <Input
                          placeholder='e.g. shop'
                          {...field}
                          onChange={handleIconChange}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Choose Icon for the link</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='My Website' {...field} />
                    </FormControl>
                    <FormDescription>Display text for link</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='href'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder='https://example.com' {...field} />
                    </FormControl>
                    <FormDescription>Publicly available url</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={form.formState.isSubmitting}
                className='self-center'
              >
                Create Link
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </footer>
  );
}

export function PageOptions() {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align='end'>
          <DropdownMenuLabel>Page Options</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          {/* <DropdownMenuItem asChild>
            <>
            <ChangeHeaderColor>
              Change Color
              </ChangeHeaderColor>
            </>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem asChild>
              <Button
                variant='destructive'
                className='flex w-full items-center gap-2'
              >
                <TrashIcon className='size-5' /> Delete
              </Button>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePage />
    </Dialog>
  );
}

export function ChangeHeaderColor({ children, currentColor}: {children?: ReactElement, currentColor:string}) {
  const params = useParams()
  const [header, setHeader] = useState<HTMLDivElement |null>(null)
  const [openPalette, setOpenPalette] = useState(false)
  const [newColor, setNewColor] = useState('')

  const router = useRouter()
  useEffect(() => {
    const pageHeader = document.querySelector(`#${params.page}Header`) as HTMLDivElement
    setHeader(pageHeader)
    return() => {
      setHeader(null)
    }
  }, [params.page])

  function handleColorClick(color: string) {
    if (!header) return null
      header.style.background = color
      setNewColor(color)
  }
  const setHeaderColorWithPageId = setHeaderColor.bind(null, params.page as string)
  async function handleSave(color: string | null){
   const setNewHeaderColor =   setHeaderColorWithPageId.bind(null, color)
setOpenPalette(false)
    toast.promise(setNewHeaderColor(), {
      loading: 'Saving',
      success: color ? 'New Color has been set' : 'Color has been Reset to default',
      error: 'Error',
    });
    setNewColor('')
    router.refresh()
  }

  function handleCancel() {
    setOpenPalette(false)
    setNewColor('')
    if (!header) return null
    header.style.backgroundColor = currentColor
  }



  return(
    <div className="relative">
    <Button variant="ghost" size="icon" onClick={() => {setOpenPalette(!openPalette)}}>
      <CiPalette className='size-6'/>
      {children}
    </Button>
    {openPalette && <>
    <div className='absolute w-max -right-1 top-full translate-y-1/2 '>
    <Card className='grid grid-cols-11 grid-flow-row max-h-40 overflow-y-scroll border gap-px scrollbar-hidden' >
      {tailwindColors.map((color, index) => (
        <Button key={color + index} size="icon" variant="ghost" style={{background: color}} onClick={(() => handleColorClick(color))} />
      ))}
    </Card>

    <Card className='flex flex-row items-center justify-end gap-4 mt-2 py-2 px-4'>
      <Button variant={'destructive'} className='mr-auto' onClick={() => handleSave(null)}>Reset Color</Button>
      <Button variant={'secondary'} onClick={() => handleCancel()}>Cancel</Button>
      <Button variant={'default'} onClick={() => handleSave(newColor)}>Save</Button>
    </Card>
      </div>
      </>}
    </div>
  )
}

function DeletePage() { 
  const { page } = useParams<{ page: string }>();
  const form = useForm();
  const { isSubmitting } = form.formState;
  form.setValue('pagename', page);
  async function onSubmit(value: any) {
    return await deletePage(value);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this page from our servers?
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  console.log('closed');
                }}
              >
                Close
              </Button>
            </DialogClose>
            <Button
              type='submit'
              variant='destructive'
              className='flex items-center gap-2'
              disabled={isSubmitting}
            >
              {' '}
              {isSubmitting ? (
                <ImSpinner2 className='size-5 animate-spin' />
              ) : (
                <TrashIcon className='size-5' />
              )}
              Delete Page
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
