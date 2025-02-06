import { User } from '@supabase/supabase-js';
import { getPushToken } from '../utils/notification/register';
import { supabase } from '../utils/supabase/client';

export const upsertPushToken = async (user: User | null) => {
  if (!user) return;
  try {
    const token = await getPushToken();
    if (token === user.user_metadata.push_token) return;
    const { error: upsertError } = await supabase
      .from('users')
      .upsert({ id: user.id, push_token: token, nickname: '', profile_image: '' })
      .select();
    if (upsertError) throw new Error();
    const { error } = await supabase.auth.updateUser({
      data: { push_token: token, nickname: '', profile_image: '' },
    });
    if (error) throw error;
  } catch (error) {
    console.log('🚀 ~ upsertPushToken ~ error:', error);
  }
};
