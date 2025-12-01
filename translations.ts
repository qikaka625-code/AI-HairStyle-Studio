import { Language } from './types';

interface TranslationData {
  title: string;
  poweredBy: string;
  uploadNew: string;
  uploadTitle: string;
  uploadDrag: string;
  uploadRec: string;
  selectStyle: string;
  filterLength: string;
  filterColor: string;
  filterAll: string;
  noStyles: string;
  clearFilters: string;
  selected: string;
  selectOrType: string;
  generate: string;
  processingTitle: string;
  processingDesc: string;
  styling: string;
  saveImage: string;
  errorGen: string;
  errorSelect: string;
  errorNoImage: string;
  resultPlaceholder: string;
  resultPlaceholderDesc: string;
  sourcePlaceholder: string;
  gender: {
    Female: string;
    Male: string;
    Unisex: string;
  };
  lengths: {
    Short: string;
    Medium: string;
    Long: string;
  };
  colors: {
    Black: string;
    Brown: string;
    Blonde: string;
    Red: string;
    Silver: string;
    Color: string;
  }
}

export const translations: Record<Language, TranslationData> = {
  en: {
    title: "HairStyle AI",
    poweredBy: "Powered by",
    uploadNew: "Change Photo",
    uploadTitle: "Upload Photo",
    uploadDrag: "Drag & drop or click",
    uploadRec: "Clear face, good lighting",
    selectStyle: "Choose a Hairstyle",
    filterLength: "Length",
    filterColor: "Color",
    filterAll: "All",
    noStyles: "No styles match.",
    clearFilters: "Clear",
    selected: "Selected:",
    selectOrType: "Select a style below",
    generate: "Generate Hairstyle",
    processingTitle: "Styling...",
    processingDesc: "Creating your new look (5-10s)",
    styling: "Processing",
    saveImage: "Download",
    errorGen: "Generation failed. Try again.",
    errorSelect: "Please select a style first.",
    errorNoImage: "Please upload an image first.",
    resultPlaceholder: "Your Result",
    resultPlaceholderDesc: "Select a style and click Generate to see the magic happen here.",
    sourcePlaceholder: "Original Image",
    gender: {
      Female: "Female",
      Male: "Male",
      Unisex: "Unisex"
    },
    lengths: {
      Short: "Short",
      Medium: "Medium",
      Long: "Long"
    },
    colors: {
      Black: "Black",
      Brown: "Brown",
      Blonde: "Blonde",
      Red: "Red",
      Silver: "Silver",
      Color: "Color"
    }
  },
  zh: {
    title: "AI 发型工作室",
    poweredBy: "技术支持",
    uploadNew: "更换照片",
    uploadTitle: "上传照片",
    uploadDrag: "拖放或点击上传",
    uploadRec: "建议：面部清晰",
    selectStyle: "选择发型",
    filterLength: "长度",
    filterColor: "发色",
    filterAll: "全部",
    noStyles: "无匹配发型",
    clearFilters: "清除",
    selected: "已选：",
    selectOrType: "请在下方选择发型",
    generate: "立即生成",
    processingTitle: "造型中...",
    processingDesc: "正在生成新发型 (5-10秒)",
    styling: "处理中",
    saveImage: "保存图片",
    errorGen: "生成失败，请重试。",
    errorSelect: "请先选择一个发型。",
    errorNoImage: "请先上传一张照片。",
    resultPlaceholder: "效果展示",
    resultPlaceholderDesc: "选择发型并点击生成，此处将显示最终效果。",
    sourcePlaceholder: "原始图片",
    gender: {
      Female: "女士",
      Male: "男士",
      Unisex: "通用"
    },
    lengths: {
      Short: "短发",
      Medium: "中发",
      Long: "长发"
    },
    colors: {
      Black: "黑色",
      Brown: "棕色",
      Blonde: "金色",
      Red: "红色",
      Silver: "银色",
      Color: "彩色"
    }
  },
  vi: {
    title: "AI Tạo Kiểu Tóc",
    poweredBy: "Hỗ trợ bởi",
    uploadNew: "Đổi Ảnh",
    uploadTitle: "Tải Ảnh",
    uploadDrag: "Kéo thả hoặc nhấn",
    uploadRec: "Rõ mặt, đủ sáng",
    selectStyle: "Chọn Kiểu Tóc",
    filterLength: "Độ Dài",
    filterColor: "Màu",
    filterAll: "Tất cả",
    noStyles: "Không tìm thấy.",
    clearFilters: "Xóa lọc",
    selected: "Đã chọn:",
    selectOrType: "Chọn kiểu bên dưới",
    generate: "Tạo Kiểu Ngay",
    processingTitle: "Đang xử lý...",
    processingDesc: "Đang tạo kiểu tóc mới (5-10s)",
    styling: "Đang chạy",
    saveImage: "Tải về",
    errorGen: "Thất bại. Thử lại nhé.",
    errorSelect: "Vui lòng chọn kiểu tóc.",
    errorNoImage: "Vui lòng tải ảnh lên trước.",
    resultPlaceholder: "Kết Quả",
    resultPlaceholderDesc: "Chọn kiểu và nhấn Tạo để xem kết quả tại đây.",
    sourcePlaceholder: "Ảnh Gốc",
    gender: {
      Female: "Nữ",
      Male: "Nam",
      Unisex: "Unisex"
    },
    lengths: {
      Short: "Ngắn",
      Medium: "Vừa",
      Long: "Dài"
    },
    colors: {
      Black: "Đen",
      Brown: "Nâu",
      Blonde: "Vàng",
      Red: "Đỏ",
      Silver: "Bạc",
      Color: "Màu"
    }
  },
  th: {
    title: "สตูดิโอทรงผม AI",
    poweredBy: "ขับเคลื่อนโดย",
    uploadNew: "เปลี่ยนรูป",
    uploadTitle: "อัปโหลดรูป",
    uploadDrag: "ลากวาง หรือ คลิก",
    uploadRec: "เห็นหน้าชัดเจน",
    selectStyle: "เลือกทรงผม",
    filterLength: "ความยาว",
    filterColor: "สีผม",
    filterAll: "ทั้งหมด",
    noStyles: "ไม่พบทรงผม",
    clearFilters: "ล้างตัวกรอง",
    selected: "เลือก:",
    selectOrType: "เลือกทรงผมด้านล่าง",
    generate: "สร้างทรงผม",
    processingTitle: "กำลังทำผม...",
    processingDesc: "กำลังสร้างลุคใหม่ (5-10 วินาที)",
    styling: "กำลังประมวลผล",
    saveImage: "บันทึกรูป",
    errorGen: "เกิดข้อผิดพลาด โปรดลองใหม่",
    errorSelect: "กรุณาเลือกทรงผมก่อน",
    errorNoImage: "กรุณาอัปโหลดรูปภาพก่อน",
    resultPlaceholder: "ผลลัพธ์",
    resultPlaceholderDesc: "เลือกทรงผมและกดสร้างเพื่อดูผลลัพธ์ที่นี่",
    sourcePlaceholder: "รูปต้นฉบับ",
    gender: {
      Female: "หญิง",
      Male: "ชาย",
      Unisex: "ไม่ระบุ"
    },
    lengths: {
      Short: "สั้น",
      Medium: "ประบ่า",
      Long: "ยาว"
    },
    colors: {
      Black: "ดำ",
      Brown: "น้ำตาล",
      Blonde: "บลอนด์",
      Red: "แดง",
      Silver: "เงิน",
      Color: "สีสัน"
    }
  }
};