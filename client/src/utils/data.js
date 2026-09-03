
import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
} from "lucide-react";

// Job Seeker Features
export const jonSeekerFeatures = [
  {
    icon: Search,
    title: "স্মার্ট চাকরি খোঁজা",
    description:
      "আপনার দক্ষতা, অভিজ্ঞতা ও পছন্দের ভিত্তিতে উপযুক্ত চাকরির সুযোগ সহজে খুঁজে পেতে সহায়তা করবে।",
  },
  {
    icon: FileText,
    title: "রিজিউমে তৈরি",
    description:
      "সহজেই একটি আকর্ষণীয় ও প্রফেশনাল রিজিউমে তৈরি করুন এবং নিয়োগদাতাদের কাছে আপনার দক্ষতা তুলে ধরুন।",
  },
  {
    icon: MessageSquare,
    title: "সরাসরি যোগাযোগ",
    description:
      "চাকরিপ্রার্থী ও নিয়োগদাতার মধ্যে সরাসরি যোগাযোগের মাধ্যমে দ্রুত তথ্য আদান-প্রদান করুন।",
  },
  {
    icon: Award,
    title: "দক্ষতা যাচাই",
    description:
      "বিভিন্ন দক্ষতা যাচাইয়ের মাধ্যমে নিজের যোগ্যতা মূল্যায়ন করুন এবং চাকরির জন্য আরও প্রস্তুত হন।",
  },
];

// Employer Features
export const employerFeatures = [
  {
    icon: Users,
    title: "প্রতিভাবান প্রার্থী খোঁজা",
    description:
      "বিভিন্ন দক্ষতা ও অভিজ্ঞতার প্রার্থীদের বিশাল তালিকা থেকে আপনার প্রতিষ্ঠানের জন্য সেরা প্রার্থী খুঁজে নিন।",
  },
  {
    icon: BarChart3,
    title: "অ্যানালিটিক্স ড্যাশবোর্ড",
    description:
      "চাকরির পোস্ট, আবেদনকারী এবং নিয়োগ কার্যক্রমের গুরুত্বপূর্ণ তথ্য একটি সহজ ড্যাশবোর্ডে দেখুন।",
  },
  {
    icon: Shield,
    title: "যাচাইকৃত প্রার্থী",
    description:
      "যাচাইকৃত ও যোগ্য প্রার্থীদের খুঁজে নিয়ে আরও নির্ভরযোগ্যভাবে নিয়োগ প্রক্রিয়া সম্পন্ন করুন।",
  },
  {
    icon: Clock,
    title: "দ্রুত নিয়োগ",
    description:
      "সঠিক প্রার্থী দ্রুত খুঁজে বের করে কম সময়ে আপনার নিয়োগ প্রক্রিয়া সম্পন্ন করুন।",
  },
];

// Navigation Menu
export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "ড্যাশবোর্ড",
    icon: LayoutDashboard,
  },
  {
    id: "post-job",
    name: "চাকরি পোস্ট করুন",
    icon: Plus,
  },
  {
    id: "manage-jobs",
    name: "আবেদন পর্যালোচনা করুন",
    icon: Briefcase,
  },
  {
    id: "company-profile",
    name: "কোম্পানি প্রোফাইল",
    icon: Building2,
  },
];

// Job Categories
export const CATEGORIES = [
  {
    value: "Engineering",
    label: "ইঞ্জিনিয়ারিং",
  },
  {
    value: "Design",
    label: "ডিজাইন",
  },
  {
    value: "Marketing",
    label: "মার্কেটিং",
  },
  {
    value: "Sales",
    label: "সেলস",
  },
  {
    value: "IT & Software",
    label: "আইটি ও সফটওয়্যার",
  },
  {
    value: "Customer-Service",
    label: "কাস্টমার সার্ভিস",
  },
  {
    value: "Product",
    label: "প্রোডাক্ট",
  },
  {
    value: "Operations",
    label: "অপারেশনস",
  },
  {
    value: "Finance",
    label: "ফাইন্যান্স",
  },
  {
    value: "HR",
    label: "হিউম্যান রিসোর্স",
  },
  {
    value: "Other",
    label: "অন্যান্য",
  },
];

// Job Types
export const JOB_TYPES = [
  {
    value: "Remote",
    label: "রিমোট",
  },
  {
    value: "Full-Time",
    label: "ফুল-টাইম",
  },
  {
    value: "Part-Time",
    label: "পার্ট-টাইম",
  },
  {
    value: "Contract",
    label: "চুক্তিভিত্তিক",
  },
  {
    value: "Internship",
    label: "ইন্টার্নশিপ",
  },
];

// Salary Ranges
export const SALARY_RANGES = [
  "৳১৫,০০০ এর কম",
  "৳১৫,০০০ - ৳১৫,০০০০",
  "৳৫০,০০০ এর বেশি",
];

