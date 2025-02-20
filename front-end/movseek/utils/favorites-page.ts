function formatTimestampWithSuffix(timestamp: number | null | undefined): string {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  // Tạo danh sách tên tháng
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Lấy ngày, tháng, năm
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Hàm xác định hậu tố ngày
  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th'; // Các trường hợp đặc biệt
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Kết hợp ngày, tháng, năm với hậu tố
  const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  return `${dayWithSuffix} ${month} ${year}`;
}

export { formatTimestampWithSuffix };
