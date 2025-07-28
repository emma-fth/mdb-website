import Image from 'next/image'

interface MemberDBProps {
  name: string
  title: string
  image: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function MemberDB({ name, title, image, size = 'medium', className = '' }: MemberDBProps) {
  const sizeClasses = {
    small: {
      container: 'w-28 h-28',
      name: 'text-sm',
      title: 'text-xs'
    },
    medium: {
      container: 'w-32 h-32',
      name: 'text-base',
      title: 'text-sm'
    },
    large: {
      container: 'w-40 h-40',
      name: 'text-lg',
      title: 'text-base'
    }
  }

  const currentSize = sizeClasses[size]

  return (
    <div className={`text-center hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center ${className}`}>
      <div className={`relative mx-auto mb-3 overflow-hidden rounded-lg ${currentSize.container}`}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className={`font-semibold text-gray-800 mb-1 ${currentSize.name}`}>{name}</h3>
      <p className={`text-gray-600 ${currentSize.title}`}>{title}</p>
    </div>
  )
} 