import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../services/api';
import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import clsx from 'clsx';
import { toast } from 'sonner';

const Orders = () => {
  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['myOrders'],
    queryFn: userAPI.myOrders,
  });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Cancel this order?')) {
      return;
    }
    try {
      await userAPI.cancelOrder(orderId);
      toast.success('Order cancelled');
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 flex items-center justify-center">
        <div className="text-lg">Loading your orders...</div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg">
            <Package size={80} className="mx-auto text-gray-400 mb-8" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-8">Start ordering to see your history here</p>
            <a href="/" className="btn btn-primary px-8 py-4">Browse Food</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Orders</h1>
          <p className="text-xl text-gray-600">Track all your food orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className={clsx('px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2', getStatusColor(order.status))}>
                    {getStatusIcon(order.status)}
                    {order.status.toUpperCase()}
                  </div>
                  <span className="text-2xl font-bold text-food-gold">Order #{order.orderId}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                  <div>
                    <span className="text-gray-500">Date</span>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total</span>
                    <p className="font-bold text-2xl text-food-gold">INR {order.totalAmount}</p>
                  </div>
                  <div className="text-right md:text-left">
                    {order.status.toLowerCase() === 'placed' && (
                      <button
                        onClick={() => handleCancelOrder(order.orderId)}
                        className="btn btn-danger px-6 py-2 text-sm"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-6">Items</h3>
                  <div className="space-y-4">
                    {order.items.map((orderItem) => (
                      <div key={orderItem.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">🍲</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{orderItem.menuItemName}</h4>
                          <p className="text-sm text-gray-600">Qty: {orderItem.quantity}</p>
                        </div>
                        <span className="font-bold text-lg text-food-gold">INR {orderItem.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
