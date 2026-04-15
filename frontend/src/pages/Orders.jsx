import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../services/api';
import { Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import clsx from 'clsx';

const Orders = () => {
  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ['myOrders'],
    queryFn: userAPI.myOrders,
  });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 py-24 flex items-center justify-center">
      <div className="text-lg">Loading your orders...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Orders</h1>
          <p className="text-xl text-gray-600">Track all your food orders</p>
        </div>

        {(!orders?.data || orders.data.length === 0) ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-lg">
            <Package size={80} className="mx-auto text-gray-400 mb-8" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-8">Start ordering to see your history here</p>
            <a href="/" className="btn btn-primary px-8 py-4">Browse Food</a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.data.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={clsx('px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2', getStatusColor(order.status))}>
                      {getStatusIcon(order.status)}
                      {order.status.toUpperCase()}
                    </div>
                    <span className="text-2xl font-bold text-food-gold">Order #{order.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div>
                      <span className="text-gray-500">Date</span>
                      <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total</span>
                      <p className="font-bold text-2xl text-food-gold">${order.total_amount}</p>
                    </div>
                    <div className="text-right md:text-left">
                      {order.status.toLowerCase() === 'placed' && (
                        <button
                          onClick={async () => {
                            if (confirm('Cancel this order?')) {
                              await userAPI.cancelOrder(order.id);
                              refetch();
                            }
                          }}
                          className="btn btn-danger px-6 py-2 text-sm"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {order.orderItems && order.orderItems.length > 0 && (
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-6">Items</h3>
                    <div className="space-y-4">
                      {order.orderItems.map((orderItem, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">🍲</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{orderItem.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {orderItem.quantity}</p>
                          </div>
                          <span className="font-bold text-lg text-food-gold">${(orderItem.price * orderItem.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

