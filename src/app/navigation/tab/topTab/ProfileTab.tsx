// import {View, Text} from 'react-native';
// import React from 'react';
// import RenderTabs, {TTabScreen} from '~/navigation/tab/topTab';
// import Profile from '~/screens/Home/ProfileDetails/Profile/Profile';
// import CompanyDetails from '~/screens/Home/ProfileDetails/Company/CompanyDetails';
// import IndustryAndServices from '~/screens/Home/ProfileDetails/IndustryAndServices/IndustryAndServices';
// import CompanyBranches from '~/screens/Home/ProfileDetails/CompanyBranches/CompanyBranches';

// import {
//   HeaderLeftContent,
//   HeaderRightContent,
// } from '~/epcore/elements/AkHeader/component/headerSection';
// import {AkHeader} from '~/epcore/elements';

// const profileTabs: TTabScreen[] = [
//   {
//     name: 'ProfileDetails',
//     component: Profile,
//     listeners: {
//       tabPress: (e) => {
//         // Prevent default action
//         e.preventDefault();
//       },
//     },
//   },
//   {
//     name: 'CompanyDetails',
//     component: CompanyDetails,
//     options: {title: 'Company Details'},
//     listeners: {
//       tabPress: (e) => {
//         // Prevent default action
//         e.preventDefault();
//       },
//     },
//   },
//   {
//     name: 'IndustryAndServices',
//     component: IndustryAndServices,
//     options: {title: 'Industry & Services'},
//     listeners: {
//       tabPress: (e) => {
//         // Prevent default action
//         e.preventDefault();
//       },
//     },
//   },
//   {
//     name: 'CompanyBranches',
//     component: CompanyBranches,
//     options: {title: 'Company Branches'},
//     listeners: {
//       tabPress: (e) => {
//         // Prevent default action
//         e.preventDefault();
//       },
//     },
//   },
// ];

// const ProfileTabList = () => {
//   return (
//     <RenderTabs
//       screens={profileTabs}
//       config={{tabBarPressColor: 'transparent', swipeEnabled: false}}
//     />
//   );
// };

// export default ProfileTabList;
