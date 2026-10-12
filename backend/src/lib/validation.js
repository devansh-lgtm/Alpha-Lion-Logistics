const { z } = require('zod');

const phone = z
  .string()
  .trim()
  .min(7, 'Phone number is too short')
  .max(25, 'Phone number is too long')
  .regex(/^[+()\-.\s\d]+$/, 'Phone number contains invalid characters');

const base = {
  name: z.string().trim().min(2, 'Name is required').max(100),
  company: z.string().trim().min(1, 'Company is required').max(120),
  email: z.string().trim().email('A valid email is required').max(160),
  phone,
  // Honeypot: real users never fill this. Accept anything here; the route silently drops filled submissions.
  website: z.string().max(500).optional(),
};

const EQUIPMENT = [
  'Dry Van',
  'Reefer',
  'Flatbed',
  'Step Deck',
  'Power Only',
  'Container / Drayage',
  'Box Truck',
  'Sprinter / Cargo Van',
  'Other',
];

const SERVICES = [
  'FTL / Dry Van',
  'LTL & Partial',
  'Drayage',
  'Transloading',
  'Import & Export Transportation',
  'Expedited & Dedicated',
  'Spot & Overflow Capacity',
  'Not sure yet',
];

const quoteSchema = z.object({
  ...base,
  origin: z.string().trim().min(2, 'Origin is required').max(160),
  destination: z.string().trim().min(2, 'Destination is required').max(160),
  equipment: z.enum(EQUIPMENT, { message: 'Please choose an equipment type' }),
  service: z.enum(SERVICES).optional(),
  pickupDate: z.string().trim().max(40).optional().or(z.literal('')),
  weight: z.string().trim().max(40).optional().or(z.literal('')),
  commodity: z.string().trim().max(160).optional().or(z.literal('')),
  details: z.string().trim().min(5, 'Please add a few shipment details').max(3000),
});

const contactSchema = z.object({
  ...base,
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Message is required').max(3000),
});

module.exports = { quoteSchema, contactSchema, EQUIPMENT, SERVICES };
