import { Briefcase} from 'lucide-react';

// fullPage: পুরো পেজ লোডিং (ডিফল্ট)
// inline: section-এর ভেতরে ছোট লোডিং
const LoadingSpinner = ({ inline = false }) => {
  if (inline) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-4'>
        <div className='relative'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mx-auto'/>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Briefcase className='w-5 h-5 text-blue-600'/>
          </div>
        </div>
        <p className='text-slate-500 text-sm font-semibold'>চাকরিগুলো লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
            <div className='relative'>
                <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4'/>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <Briefcase className='w-6 h-6 text-blue-600'/>
                </div>
            </div>
            <p className='text-gray-600 font-medium'>দারুণ সুযোগ খোঁজা হচ্ছে...</p>
        </div>
    </div>
  )
}

export default LoadingSpinner