/** Delivery URL for a guest photo: Cloudinary resizes it and picks the best format and quality. */
export function photoUrl(cloudName: string, id: string, width: number) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_${width},f_auto,q_auto/${id}`;
}
