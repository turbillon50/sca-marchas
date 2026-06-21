import { OrdersClient } from "@/components/admin/OrdersClient";
import { getOrders, getTechnicians } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function OrdenesPage() {
  const [orders, techs] = await Promise.all([getOrders(), getTechnicians()]);
  return <OrdersClient orders={orders} techs={techs} />;
}
