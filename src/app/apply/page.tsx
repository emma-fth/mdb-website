import Flyer from './components/Flyer'
import Calendly from './components/Calendly'

export default function Apply() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mdb-light-blue to-white">
      <Flyer />
      <div className="w-full px-4 py-8 relative z-10 bg-gradient-to-t from-mdb-light-blue to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-raleway-bold text-mdb-blue mb-4">
              Schedule a Coffee Chat!
            </h2>
            {/* <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              
            </p> */}
          </div>
          
          <div className="mdb-glass rounded-2xl shadow-2xl overflow-hidden">
          {/* Tall enough on desktop to show both gallery rows without inner scrolling;
              phones fall back to a short frame since the gallery stacks to one long column there. */}
          <iframe
          className="airtable-embed h-[533px] lg:h-[1200px]"
          src="https://airtable.com/embed/appFIvvLKJj8FpDou/shrg6q9IqDVmp1ybB?viewControls=on"
          frameBorder="0"
          width="100%"
          style={{ background: 'transparent', border: '1px solid #ccc' }}
          ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
} 