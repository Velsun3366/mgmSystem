interface echartsData {
  saleMap: {
    saleNum: number;
    areaName: string;
    [key: string]: string;
  }[];
  salePie: {
    name: string;
    sale_today: string;
    [key: string]: string;
  }[];
}
