import { EarthCanvas } from '../canvas'
import { Header } from '../atoms/Header'
import { IContact } from '@/types/contact.type'
import { SectionWrapper } from '../../hoc'
import { config } from '../../constants/config'
import { contactSchema } from '@/schemas/contact.schema'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { slideIn } from '../../utils/motion'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

const Contact = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema)
  })

  const onSubmit = async (data: IContact) => {
    try {
      setLoading(true)

      const emailService = import.meta.env.VITE_EMAIL_SERVICE
      const emailTemplate = import.meta.env.VITE_EMAIL_TEMPLATE_ID
      const emailUserId = import.meta.env.VITE_EMAIL_USER_ID

      const body = {
        username: data.name,
        email: data.email,
        message: data.message
      }

      await emailjs.send(emailService, emailTemplate, body, emailUserId)
      toast.success('Thank you. I will get back to you as soon as possible.')
      setLoading(false)
    } catch (error) {
      toast.error('Something went wrong.')
      setLoading(false)
    }

    // emailjs
    //   .send(emailService, emailTemplate, body, emailUserId)
    //   .then((response) => {
    //     toast.success('Thank you. I will get back to you as soon as possible.')
    //     setLoading(false)
    //   })
    //   .catch((error) => {
    //     toast.error('Something went wrong.')
    //     setLoading(false)
    //   })
  }

  // const formRef = useRef<React.LegacyRef<HTMLFormElement> | undefined>()
  // const [form, setForm] = useState(INITIAL_STATE)
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  // ) => {
  //   if (e === undefined) return;
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
  //   if (e === undefined) return;
  //   e.preventDefault();
  //   setLoading(true);

  //   emailjs
  //     .send(
  //       emailjsConfig.serviceId,
  //       emailjsConfig.templateId,
  //       {
  //         form_name: form.name,
  //         to_name: config.html.fullName,
  //         from_email: form.email,
  //         to_email: config.html.email,
  //         message: form.message,
  //       },
  //       emailjsConfig.accessToken
  //     )
  //     .then(
  //       () => {
  //         setLoading(false);
  //         alert("Thank you. I will get back to you as soon as possible.");

  //         setForm(INITIAL_STATE);
  //       },
  //       (error) => {
  //         setLoading(false);

  //         console.log(error);
  //         alert("Something went wrong.");
  //       }
  //     );
  // };
  // console.log(Object.keys(config.contact.form))

  return (
    <div className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='bg-black-100 flex-[0.75] rounded-2xl p-8'>
        <Header useMotion={false} {...config.contact} />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 mt-12'>
          {/* Object.keys: có nhiệm vụ convert object => array */}
          {/* {Object.keys(config.contact.form).map((input) => {
            // Object.keys(config.contact.form) => cónt array = ['name', 'email', 'message'] => array[2]
            // name =>
            const { span, placeholder } = config.contact.form[input as keyof typeof config.contact.form]
            // tìm ra config.contact.form['name'] => { span: 'Your Name', placeholder: "What's your name?" }
            console.log(
              '🚀 ~ {Object.keys ~ input as keyof typeof config.contact.form:',
              input as keyof typeof config.contact.form // so sánh với config.contact.form['name'] => name
            )
            console.log(
              '🚀 ~ {Object.keys ~ config.contact.form[input as keyof typeof config.contact.form]:',
              config.contact.form[input as keyof typeof config.contact.form] // config.contact.form['name']
            )

            const Component = input === 'message' ? 'textarea' : 'input'

            return (
              <label key={input} className='flex flex-col'>
                <span className='mb-4 font-medium text-white'>{span}</span>
                <Component
                  type={input === 'email' ? 'email' : 'text'}
                  name={input}
                  value={form[`${input}`]}
                  // onChange={handleChange}
                  placeholder={placeholder}
                  className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'
                  {...(input === 'message' && { rows: 7 })}
                />
              </label>
            )
          })} */}

          <div>
            <label className='flex flex-col'>
              <span className='mb-4 font-medium text-white'>{config.contact.form.name.span}</span>
              <input
                type={'text'}
                {...register('name')}
                placeholder={config.contact.form.name.placeholder}
                className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'
              />
              {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
            </label>
          </div>

          <div>
            <label className='flex flex-col'>
              <span className='mb-4 font-medium text-white'>{config.contact.form.email.span}</span>
              <input
                type={'email'}
                {...register('email')}
                placeholder={config.contact.form.email.placeholder}
                className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'
              />
              {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
            </label>
          </div>

          <div>
            <label className='flex flex-col'>
              <span className='mb-4 font-medium text-white'>{config.contact.form.message.span}</span>
              <textarea
                {...register('message')}
                placeholder={config.contact.form.message.placeholder}
                className='px-6 py-4 font-medium text-white border-none rounded-lg outline-none bg-tertiary placeholder:text-secondary'
              />
              {errors.message && <span className='text-sm text-red-500'>{errors.message.message}</span>}
            </label>
          </div>

          <button
            type='submit'
            className='px-8 py-3 font-bold text-white shadow-md outline-none bg-tertiary shadow-primary w-fit rounded-xl'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className='h-[350px] md:h-[550px] xl:h-auto xl:flex-1'>
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
