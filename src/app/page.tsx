import TitleSection from './components/sections/TitleSection'
import PurpAndComm from './components/sections/PurpAndComm'
import Carousel from './components/Carousel'
import Destinations from './components/sections/Destinations'
import GetInvolved from './components/sections/GetInvolved'

export default function Home() {
  return (
    <div>
      <TitleSection />
      <PurpAndComm />
      <Carousel />
      <GetInvolved />
      <Destinations />
    </div>
  )
}
