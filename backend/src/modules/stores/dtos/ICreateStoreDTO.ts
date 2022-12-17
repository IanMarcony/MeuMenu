export default interface ICreateStoreDTO {
  name: string;
  description: string;
  phone_number: string;
  url_profile_image: string;
  url_banner_image: string;
  open_hour: Date;
  close_hour: Date;
  status_id: number;
  id_admin: number;
  contract_type_id: number;
}
