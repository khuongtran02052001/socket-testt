import { IconType } from 'react-icons';
import { FcAbout, FcBusinessContact, FcHeadset, FcHome, FcIdea, FcPortraitMode, FcShop, FcTodoList, FcVideoFile } from 'react-icons/fc'

export interface DataComponent {
    title: string;
    Icon: IconType
}

export const DataLeft: DataComponent[] = [

    {
        Icon: FcHome,
        title: 'Home'

    },

    {
        Icon: FcPortraitMode,
        title: 'SignIn/SignUp'

    },

    {
        Icon: FcTodoList,
        title: 'Listings'

    },

    {
        Icon: FcHeadset,
        title: 'Podcast'

    },

    {
        Icon: FcVideoFile,
        title: 'Videos'

    },

    {
        Icon: FcIdea,
        title: 'FAQ'

    },

    {
        Icon: FcShop,
        title: 'Dev shop'

    },

    {
        Icon: FcAbout,
        title: 'About'

    },

    {
        Icon: FcBusinessContact,
        title: 'Contact'

    },
]