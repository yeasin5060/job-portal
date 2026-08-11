import {Search , Users , FileText, MessageSquare, BarChart3, Shield, Clock, Award, Briefcase , Building2 , LayoutDashboard, Plus} from 'lucide-react';


export const jonSeekerFeatures = [
    {
        icon : Search ,
        title : "Smart Jobs Matching",
        description : ""
    },
    {
        icon : FileText ,
        title : "Resume Builder",
        description : ""
    },
    {
        icon : MessageSquare ,
        title : "Direct Communication",
        description : ""
    },
    {
        icon : Award ,
        title : "Skill Assessment",
        description : ""
    },

];


export const employerFeatures = [
    {
        icon : Users ,
        title : "Talent Pool Access",
        description : ""
    },
    {
        icon : BarChart3 ,
        title : "Analytics Dashboard",
        description : ""
    },
    {
        icon : Shield ,
        title : "Verified Candidates",
        description : ""
    },
    {
        icon : Clock ,
        title : "Quick Hiring",
        description : ""
    },

];

//Navigation items Configuration
export const NAVIGATION_MENU = [
    {id : "employer-dashboard" , name : "Dashboard" , icon : LayoutDashboard},
    {id : "post-job" , name : "Post Job" , icon : Plus},
    {id : "manage-jobs" , name : "Manage Jobs" , icon : Briefcase},
    {id : "company-profile" , name : "Company Profile" , icon : Building2},
];

//Categories and job types
export const CATEGORIES = [
    {value : "Engineering" , label : "Engineering"},
    {value : "Design" , label : "Design"},
    {value : "Marketing" , label : "Marketing" },
    {value : "Sales" , label : "Sales"},
    {value : "IT & Software" , label : "IT & Software"},
    {value : "Customer-Service" , label : "Customer Service"},
    {value : "Product" , label : "Product"},
    {value : "Operations" , label : "Operations"},
    {value : "Finance" , label : "Finance"},
    {value : "HR" , label : "Human Resource"},
    {value : "Other" , label : "Other"},

];
