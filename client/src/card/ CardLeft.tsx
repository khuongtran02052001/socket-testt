import { DataComponent } from 'data/DataLeft'
import React, { FunctionComponent } from 'react'

const CardLeft: FunctionComponent<{ item: DataComponent }> = ({ item: { Icon, title } }) => {
    return (
        <div className='flex justify-center my-8 cursor-pointer'>
            <Icon />
            <div className='w-1/4 ml-3 text-white font-rampartone font-bold'>
                {title}
            </div>
        </div>
    )
}

export default CardLeft
