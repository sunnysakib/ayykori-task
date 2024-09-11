import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='flex justify-center gap-x-3 bg-slate-50 py-2'>
            <Link className='text-xl font-medium hover:bg-slate-200 p-2 rounded-sm' href="/">Task 1</Link>
            <Link className='text-xl font-medium hover:bg-slate-200 p-2 rounded-sm' href="/task2">Task 2</Link>
        </div>
    );
};

export default Navbar;