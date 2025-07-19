import { Link } from "@tanstack/react-router";


export default function AddEvent() {

    return(

        <Link
        to='/form/$id'
         params={{id:'new'}}
        className='mt-1.25 py-1.25 px-3 bg-violet-500 text-white rounded-md shadow-lg hover:bg-violet-600 w-25 h-9 cursor-pointer'>
             Add Event
        </Link>

    )
    
}
