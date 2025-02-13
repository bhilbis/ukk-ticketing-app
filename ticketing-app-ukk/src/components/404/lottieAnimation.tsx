"use client"
import Lottie from "lottie-react"

import animationData from '../../../public/404/404.json'

interface LottieAnimationProps {
    width?: number;
    height?: number;  
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
    width,
    height,
}) => {
    return (
        <div style={{ width, height}} className="flex items-center justify-center absolute z-0">
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: '80%', height: '80%' }}
            />
        </div>
      )
} 

export default LottieAnimation