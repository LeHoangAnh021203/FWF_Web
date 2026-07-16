const WP_UPLOADS = "https://facewashfox.com/wp-content/uploads";
const IMAGE_PROXY = "https://menu.facewashfox.com/_next/image";

export function getWpImage(path: string, width = 3840) {
  const source = `${WP_UPLOADS}/${path}`;
  return `${IMAGE_PROXY}?url=${encodeURIComponent(source)}&w=${width}&q=75`;
}

export const serviceImages = {
  heroSprite: getWpImage("2024/06/dich-vu.png"),
  standardsCenter: getWpImage("2023/12/web-img-03-1-1.png"),
  quyTrinh: getWpImage("2023/12/quy-trinh-service.png"),
  caoCap: getWpImage("2023/12/cao-cap-service.png"),
  thietBi: getWpImage("2023/12/thiet-bi-service.png"),
  thongTin: getWpImage("2023/12/thong-tin-service.png"),
  nhanVien: getWpImage("2023/12/nhan-vien-service.png"),
  giaCa: getWpImage("2023/12/gia-ca-service.png"),
  nhanh: getWpImage("2023/12/nhanh-service.png"),
  chatLuong: getWpImage("2023/12/chat-luong-service.png"),
} as const;
