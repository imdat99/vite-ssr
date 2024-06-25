import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return  <div className="w-full bg-slate-400/10 mt-8 z-40">
  <div className="max-w-[1400px] mx-auto p-4 md:px-9 text-right space-y-4">
    <span
      className="font-[Fernando] font-black text-2xl animate-pulse duration-1000 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-violet-500"
    >
      XemĐi.Fun
    </span>
    <p className="font-bold text-foreground/60">
      Trang xem phim chất lượng thấp =))
    </p>
    <p className="text-secondary-foreground/40 text-sm">
        (v0.0.1) Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus adipisci reiciendis debitis repellat. <br/><Link to="/"><b> Perspiciatis </b></Link> fugiat debitis provident quibusdam ad dolorem tenetur vel similique sequi rerum! Necessitatibus obcaecati fuga soluta perspiciatis!
    </p>
  </div>
</div>
}

export default Footer