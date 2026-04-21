'use client'
import Image from 'next/image'

type Props = {
  src: string
  alt?: string
}

export function Avatar({ src, alt = 'User avatar' }: Props) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}