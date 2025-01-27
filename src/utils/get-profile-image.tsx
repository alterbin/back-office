export function getProfileImage(data: any) {
  const imgPlaceholder = `https://ui-avatars.com/api/?name=${data?.fullName || ''}&background=random&font-size=0.35&rounded=true`;
  return data?.imgUrl || imgPlaceholder;
}
