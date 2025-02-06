import { User } from '@supabase/supabase-js';
import { getPushToken } from '../utils/notification/register';
import { supabase } from '../utils/supabase/client';

export const upsertPushToken = async (user: User | null) => {
  if (!user) return;
  const { nickname = '', profile_image = '', push_token } = user.user_metadata;
  try {
    const newToken = await getPushToken();
    if (newToken === push_token) return;
    const { error: upsertError } = await supabase
      .from('users')
      .upsert({ id: user.id, push_token: newToken, nickname, profile_image })
      .select();
    if (upsertError) throw new Error();
    const { error } = await supabase.auth.updateUser({
      data: { push_token: newToken, nickname, profile_image },
    });
    if (error) throw error;
  } catch (error) {
    console.log('🚀 ~ upsertPushToken ~ error:', error);
  }
};
