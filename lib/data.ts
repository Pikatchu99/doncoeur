import { Droplets, Heart, MessageCircle, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Center = {
  name: string
  city: string
  country: string
  address: string
  hours: string
  open: boolean
  phone: string
  donations: string[]
  mode: string
  distance: string
  lat: number
  lng: number
}

export const centers: Center[] = [
  {
    name: 'Agence nationale pour la transfusion sanguine',
    city: 'Cotonou',
    country: 'Bénin',
    address: 'Avenue Jean-Paul II',
    hours: 'Lun–Sam 8h–17h',
    open: true,
    phone: '+229 21 30 04 52',
    donations: ['Sang total', 'Plasma'],
    mode: 'Avec ou sans rendez-vous',
    distance: '2,6 km',
    lat: 6.37,
    lng: 2.39,
  },
  {
    name: 'Centre départemental de transfusion sanguine',
    city: 'Porto-Novo',
    country: 'Bénin',
    address: 'Route de Porto-Novo',
    hours: 'Lun–Ven 8h–16h',
    open: true,
    phone: '+229 20 21 25 33',
    donations: ['Sang total'],
    mode: 'Sur rendez-vous',
    distance: '4,1 km',
    lat: 6.5,
    lng: 2.62,
  },
  {
    name: 'Centre hospitalier départemental du Borgou',
    city: 'Parakou',
    country: 'Bénin',
    address: 'Route de Nikki',
    hours: 'Lun–Ven 8h–16h',
    open: false,
    phone: '+229 23 61 02 14',
    donations: ['Sang total', 'Plasma'],
    mode: 'Sur rendez-vous',
    distance: '5,3 km',
    lat: 9.34,
    lng: 2.63,
  },
  {
    name: 'Centre de santé communal d’Abomey-Calavi',
    city: 'Abomey-Calavi',
    country: 'Bénin',
    address: 'Route de l’Université',
    hours: 'Lun–Sam 8h–17h',
    open: true,
    phone: '+229 21 36 12 08',
    donations: ['Sang total'],
    mode: 'Avec ou sans rendez-vous',
    distance: '3,2 km',
    lat: 6.4489,
    lng: 2.3554,
  },
  {
    name: 'Centre hospitalier départemental du Zou',
    city: 'Abomey',
    country: 'Bénin',
    address: 'Avenue Kpodégbé',
    hours: 'Lun–Ven 8h–16h',
    open: true,
    phone: '+229 22 50 03 21',
    donations: ['Sang total', 'Plasma'],
    mode: 'Sur rendez-vous',
    distance: '6,7 km',
    lat: 7.1833,
    lng: 1.9833,
  },
  {
    name: 'Centre hospitalier de zone de Bohicon',
    city: 'Bohicon',
    country: 'Bénin',
    address: 'Route Nationale 2',
    hours: 'Lun–Ven 8h–16h',
    open: false,
    phone: '+229 22 51 07 44',
    donations: ['Sang total'],
    mode: 'Sur rendez-vous',
    distance: '7,4 km',
    lat: 7.1783,
    lng: 2.0667,
  },
  {
    name: 'Centre hospitalier départemental de l’Atacora',
    city: 'Natitingou',
    country: 'Bénin',
    address: 'Quartier Kouti',
    hours: 'Lun–Ven 8h–16h',
    open: true,
    phone: '+229 23 82 11 09',
    donations: ['Sang total', 'Plasma'],
    mode: 'Avec ou sans rendez-vous',
    distance: '8,9 km',
    lat: 10.3042,
    lng: 1.3796,
  },
  {
    name: 'Centre de santé communal de Ouidah',
    city: 'Ouidah',
    country: 'Bénin',
    address: 'Route des Pêches',
    hours: 'Lun–Sam 8h–17h',
    open: true,
    phone: '+229 21 34 15 27',
    donations: ['Sang total'],
    mode: 'Sans rendez-vous',
    distance: '4,5 km',
    lat: 6.3628,
    lng: 2.0852,
  },
]

export const faqs = [
  [
    'Est-ce que le don fait mal ?',
    'La sensation ressemble à une prise de sang classique. La piqûre ne dure que quelques secondes, avec une équipe à vos côtés.',
  ],
  [
    'Combien de temps faut-il prévoir ?',
    'Comptez environ 45 minutes sur place, dont 10 minutes pour le prélèvement.',
  ],
  [
    'Puis-je donner si je n’ai jamais donné ?',
    'Oui. La première fois, l’équipe prend simplement plus de temps pour répondre à vos questions.',
  ],
]

export type JourneyStep = {
  number: string
  title: string
  text: string
  Icon: LucideIcon
  variant: string
}

export const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'Accueil',
    text: 'On vous accueille, on vous explique.',
    Icon: Heart,
    variant: 'heart',
  },
  {
    number: '02',
    title: 'Échange',
    text: 'Un professionnel répond à vos questions.',
    Icon: MessageCircle,
    variant: '',
  },
  {
    number: '03',
    title: 'Don',
    text: 'Dix minutes pour faire circuler la vie.',
    Icon: Droplets,
    variant: 'drop',
  },
  {
    number: '04',
    title: 'Pause',
    text: 'Une collation, puis vous repartez.',
    Icon: Sun,
    variant: 'sun',
  },
]
