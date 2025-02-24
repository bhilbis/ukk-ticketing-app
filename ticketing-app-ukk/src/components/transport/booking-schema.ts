// schemas.ts
import * as Yup from 'yup';

export const BookingSchema = Yup.object().shape({
  route_id: Yup.number().required('Required'),
  seat_code: Yup.string().required('Required'),
  total_payment: Yup.string().required('Required'),
  departure_date: Yup.string().required('Required'),
  departure_time: Yup.string().required('Required'),
});