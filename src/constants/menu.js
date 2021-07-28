import { adminRoot } from './defaultValues';
import { UserRole } from '../helpers/authHelper';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboard`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.default',
        to: `${adminRoot}/dashboard/default`,
        // roles: [UserRole.Admin],
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.content',
        to: `${adminRoot}/dashboard/content`,
        // roles: [UserRole.Editor],
      },
    ],
  },
  {
    id: 'admins',
    icon: 'iconsminds-user',
    label: 'menu.admins',
    roles: [UserRole.Admin],
    to: `${adminRoot}/admins`,
  },
  {
    id: 'users',
    icon: 'iconsminds-user',
    label: 'menu.users',
    to: `${adminRoot}/users`,
  },
  {
    id: 'community',
    icon: 'iconsminds-shop-4',
    label: 'menu.community',
    to: `${adminRoot}/community`,
    subs: [
      {
        icon: 'simple-icon-doc',
        label: 'menu.community',
        to: `${adminRoot}/community/all`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.member',
        to: `${adminRoot}/community/member`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.topic',
        to: `${adminRoot}/community/topic`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.post',
        to: `${adminRoot}/community/post`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.event',
        to: `${adminRoot}/community/event`,
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.group',
        to: `${adminRoot}/community/group`,
      },
    ],
  },
  {
    id: 'investors',
    icon: 'iconsminds-user',
    label: 'menu.investors',
    to: `${adminRoot}/investors`,
  },
  {
    id: 'hubbers-team',
    icon: 'iconsminds-user',
    label: 'menu.hubbers-team',
    to: `${adminRoot}/hubbers-team`,
  },
  {
    id: 'teams',
    icon: 'iconsminds-user',
    label: 'menu.teams',
    to: `${adminRoot}/teams`,
  },
  {
    id: 'partner',
    icon: 'iconsminds-user',
    label: 'menu.partner',
    to: `${adminRoot}/partner`,
  },

  {
    id: 'job-list',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.job-list',
    to: `${adminRoot}/job-list`,
    roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.all-jobs',
        to: `${adminRoot}/job-list/all-jobs`,
      },
    ],
  },

  {
    id: 'options',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.options',
    to: `${adminRoot}/options`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      // {
      //   icon: 'simple-icon-paper-plane',
      //   label: 'menu.basicTypeCategory',
      //   to: `${adminRoot}/options/basic-type-category`,
      // },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.basicType',
        to: `${adminRoot}/options/basic-type`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.expertiseCategory',
        to: `${adminRoot}/options/expertise-category`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.language',
        to: `${adminRoot}/options/language`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.language-level',
        to: `${adminRoot}/options/language-level`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.country',
        to: `${adminRoot}/options/country`,
      },
    ],
  },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
