import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) {
                    setError(error.message)
                    return
                }

                setProduct(data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchProduct()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">Description: {product.description || '-'}</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">Stock: {product.stock}</p>
        </div>
    )
}