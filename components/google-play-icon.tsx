import Image from 'next/image'

export function GooglePlayIcon({ className = 'size-5 shrink-0' }: { className?: string }) {
  return (
    <img
      src="/assets/images/google-play-icon.png"
      alt="Google Play Store"
      className={`${className} object-contain`}
      loading="eager"
    />
  )
}

export default GooglePlayIcon
