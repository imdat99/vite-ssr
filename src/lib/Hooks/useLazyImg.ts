import React from 'react'
import { isClient } from '../utils';

const CHECK_BROWSER = isClient && "IntersectionObserver" in window;

function loadImg(img: HTMLElement) {
    const url = img.getAttribute("lazy-src");
    const webpSrc = img.getAttribute("src");
    const isAnimate = img.hasAttribute("data-animated")
    if (url) {

        if (isAnimate) {
            img.classList.add(
                'opacity-0',
                'transition-opacity',
                'duration-500',
                'ease-in-out'
            )
            img.onload = () => {
                img.classList.remove('opacity-0')
            }
        }
        img.style.backgroundImage = `url(${webpSrc})`
        img.setAttribute('src', url)
        img.removeAttribute('lazy-src')
        
    }
  }
  
  function observerImg() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImg(entry.target as HTMLElement);
          }
        });
      },
      { root: null, threshold: 0 }
    );
  }
  
  function getLazyImg(el: HTMLElement) {
    const lazyImg = el.querySelectorAll("[lazy-src]") as NodeListOf<HTMLElement>;
    lazyImg.forEach((img) => {
      if (CHECK_BROWSER) {
        const observer = observerImg();
        observer.observe(img);
      } else {
        loadImg(img as HTMLElement);
      }
    });
  }
/**
 * A custom React hook that lazy loads images based on the intersection of the image element with the viewport.
 *
 * @param deps - The dependencies that trigger the lazy loading of images.
 * @returns A ref object that can be attached to the container element containing the lazy-loaded images.
 */
const useLazyImg = (deps?: any) => {
    const imgBlockRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        getLazyImg(imgBlockRef?.current as HTMLElement)
    }, [deps])
    return imgBlockRef
}

export default useLazyImg
