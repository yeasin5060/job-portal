import {useEffect , useState} from 'react';
import {Plus , Briefcase, Users , Building2, TrendingUp, CheckCircle2} from 'lucide-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layout/DashboardLayout';
import LoadingSpinner from '../../components/LoadingSpinner';

const Card = ({className , children}) => {
  return <>Card</>
}

const StatCard = ({tilte , value , icon : Icon , trend , trendValue , color = "blue"}) => {

  const colorClasses = {
    blue : "from-blue-500 to-blue-600",
    green : "from-emerald-500 to-emerald-600",
    purple : "from-violet-500 to-violet-600",
    orange : "from-orange-500 to-orange-600"
  }
  return ( 
    <Card className = {`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-white/80 texr-sm font-medium'>{tilte}</p>
          <p className='text-3xl font-bold mt-1'>{value}</p>
          {trend && (
            <div className='flex items-center mt-2 text-sm'>
              <TrendingUp className='h-4 w-4 mr-1'/>
              <span className='font-medium'>{trendValue}</span>
            </div>
          )}
        </div>
        <div className='bg-white/10 p-3 rounded-xl'>
          <Icon className = 'h-6 w-6'/>
        </div>
      </div>
    </Card>
  )
}

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData , setDashboardData] = useState(null);
  const [isLoading , setIsLoading] = useState(false);

  const getDashboardOverviwe = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if(response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false)
    }
  }


  useEffect(()=> {
    getDashboardOverviwe();
    return () => {};
  },[]);
  return (
    <DashboardLayout activeMenu="employer-dashboard">
        {
          isLoading ? (<LoadingSpinner/>) : ( 
          <div className='max-w-7xl mx-auto space-y-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              <StatCard 
                tilte = "Active Jobs"
                value = {dashboardData?.counts?.totalActiveJobs || 0 }
                icon = {Briefcase}
                trend = {true}
                trendValue = {`${dashboardData?.counts?.trends?.activeJobs || 0}%`}
                color = "blue"
              />
            </div>
          </div>
          )
        }
    </DashboardLayout>
  )
}

export default EmployerDashboard