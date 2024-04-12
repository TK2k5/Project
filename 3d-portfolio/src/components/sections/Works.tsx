import { Header } from '../atoms/Header'
import { IProject } from '@/types/project.type'
import { SectionWrapper } from '../../hoc'
import Tilt from 'react-parallax-tilt'
import { config } from '../../constants/config'
import { fadeIn } from '../../utils/motion'
import { github } from '../../assets'
import { motion } from 'framer-motion'
import parse from 'html-react-parser'
import { useGetAllProjectsQuery } from '../../store/services/project.service'

const ProjectCard: React.FC<{ index: number } & IProject> = ({ title, techonology, linkCode, sortDesc, images }) => {
  return (
    <motion.div>
      <Tilt>
        <div className='bg-tertiary w-full rounded-2xl p-5 sm:w-[300px] flex flex-col h-[400px]'>
          <div className='relative h-[230px] w-full'>
            <img src={(images as string[])[0]} alt={title} className='h-full w-full rounded-2xl object-cover' />
            <div className='card-img_hover absolute inset-0 m-3 flex justify-end'>
              <div
                onClick={() => window.open(linkCode, '_blank')}
                className='black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full'
              >
                <img src={github} alt='github' className='h-1/2 w-1/2 object-contain' />
              </div>
            </div>
          </div>
          <div className='mt-auto'>
            <h3 className='text-[24px] font-bold text-white'>{title}</h3>
            <p className='text-secondary mt-2 text-[14px] line-clamp-2'>{sortDesc && parse(sortDesc)}</p>
            <div className='mt-4 flex flex-wrap gap-2 truncate'>
              {techonology &&
                techonology?.frontend?.slice(0, 3).map((tag) => (
                  <p key={tag} className={`text-[14px] capitalize`}>
                    #{tag}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  const { data } = useGetAllProjectsQuery()
  console.log('🚀 ~ Works ~ data:', data)

  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className='flex w-full'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]'
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {data &&
          data.length > 0 &&
          data.slice(0, 3).map((project, index) => <ProjectCard key={`project-${index}`} index={index} {...project} />)}
      </div>
    </>
  )
}

export default SectionWrapper(Works, '')
