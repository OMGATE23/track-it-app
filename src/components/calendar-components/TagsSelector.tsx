import React, { useEffect, useRef, useState } from 'react'
import { TAGS } from '@/helpers/constansts'
import { Tag, Tags } from '@/helpers/types'

interface Props {
  selectedTags : Tag[],
  setSelectedTags : React.Dispatch<React.SetStateAction<Tag[]>>
}
const TagsSelector = ({selectedTags , setSelectedTags} : Props) => {
  const [openTagsDisplay , setOpenTagsDisplay] = useState(false)
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event : MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setOpenTagsDisplay(false);
    }
  };

  const handleChangeHandler = (tag : Tag) : void  => {
    if(!selectedTags.some(t => tag.tag === t.tag && tag.type === t.type)){
      setSelectedTags(prev => [...prev , tag])
    } else {
      setSelectedTags(prev => {
        console.log(tag, prev)
        return (
        prev.filter(t => (
          tag.tag !== t.tag
        ))
      )})
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={componentRef} className='relative w-[80%] flex items-start gap-2'>
      <button type='button' onClick={(e) => {
        e.preventDefault()
        setOpenTagsDisplay(prev => !prev)
      }} className='px-4 py-1  outline outline-1 outline-zinc-200 rounded-md shadow-sm' >Tags</button>
      <div className='flex w-[60%]  overflow-x-auto pb-2 items-center gap-2'>
        {
          selectedTags.map(tag => (
          <span 
            key={tag.tag+"."+tag.type}
            className={`${tag.background} flex items-center gap-2 rounded-full text-white outline outline-1 py-1 px-3`}>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedTags((prev) => (
                    prev.filter(t => t.tag !== tag.tag)
                  ))
                }}
                className='w-4'
                type='button'>
                <img 
                  className='text-white' 
                  src='/assets/icons/cross.svg' 
                  aria-label='remove tag'/>
              </button>{tag.tag}
          </span>
        ))
        }
      </div>
        {openTagsDisplay && (
          
            <div className='px-8 py-6 mt-2 absolute top-8 outline outline-1 outline-zinc-200 rounded-md z-[20] bg-white flex flex-col mx-auto gap-6 h-[450px] overflow-y-scroll'>
            {
              Object.keys(TAGS as Tags).map(tagType => (
                <div className='flex flex-col gap-4' key={tagType}>
                  <p className='font-bold border-b capitalize border-zinc-100'>{tagType}</p>
                    <div className='flex flex-col gap-4'>
                      {
                        (TAGS[tagType] as Tag[]).map(tag => (
                          <label 
                            className='flex items-center gap-2'
                            key={tag.type + '.' + tag.tag}>
                              <input 
                                checked = {
                                  selectedTags.some(t => t.tag === tag.tag)
                                }
                                onChange={e => {
                                handleChangeHandler(tag)
                              }} name={tagType} type='checkbox' />
                                <span className={`${tag.background} rounded-full text-white outline outline-1 py-1 px-3`} >{tag.tag}</span>
                          </label>
                        ))
                      }
                    </div>
                </div>
              ))
            }
          </div>
          
        )
      }
    </div>
  )
}

export default TagsSelector