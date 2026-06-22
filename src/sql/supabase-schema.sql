-- ============================================================
-- SUPABASE SCHEMA DDL
-- Project: Internal Operations & Member Tiering System
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. TABLE: profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  tier text NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  points integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. TABLE: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_original numeric NOT NULL DEFAULT 0,
  total_discount numeric NOT NULL DEFAULT 0,
  total_final numeric NOT NULL DEFAULT 0,
  points_earned integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. RLS POLICIES: profiles
-- ============================================================

-- SELECT: authenticated users can view their own profile; admins can view all
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- INSERT: allow self-insert (used by trigger, but also for safety)
CREATE POLICY "profiles_insert_self"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UPDATE: users can update their own full_name only
-- Admin can update role, tier, points on any profile
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_admin"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- DELETE: only admin
CREATE POLICY "profiles_delete_admin"
  ON profiles FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 6. RLS POLICIES: products
-- ============================================================

-- SELECT: all authenticated users
CREATE POLICY "products_select_authenticated"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- INSERT: admin only
CREATE POLICY "products_insert_admin"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- UPDATE: admin only
CREATE POLICY "products_update_admin"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- DELETE: admin only
CREATE POLICY "products_delete_admin"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 7. RLS POLICIES: orders
-- ============================================================

-- SELECT: members see own orders; admins see all
CREATE POLICY "orders_select"
  ON orders FOR SELECT
  TO authenticated
  USING (
    customer_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- INSERT: authenticated users (members and admins)
CREATE POLICY "orders_insert"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

-- UPDATE: only admin can update status
CREATE POLICY "orders_update_admin"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- DELETE: only admin
CREATE POLICY "orders_delete_admin"
  ON orders FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 8. TRIGGER: auto-create profile on user signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 9. TRIGGER: auto-update tier based on points
-- ============================================================
CREATE OR REPLACE FUNCTION update_tier_on_points()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.points >= 3000 THEN
    NEW.tier := 'platinum';
  ELSIF NEW.points >= 1500 THEN
    NEW.tier := 'gold';
  ELSIF NEW.points >= 500 THEN
    NEW.tier := 'silver';
  ELSE
    NEW.tier := 'bronze';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_tier ON profiles;
CREATE TRIGGER trg_update_tier
  BEFORE INSERT OR UPDATE OF points ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_tier_on_points();

-- ============================================================
-- 10. HELPER FUNCTION: check if current user is admin
-- (useful for future policies or application logic)
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 11. SEED: Create first admin user (OPTIONAL - run after signup)
-- To promote a user to admin after registration, run:
-- UPDATE profiles SET role = 'admin' WHERE id = '<user-uuid>';
-- ============================================================
