'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `create or replace function public.primary_img()
       returns trigger
       language plpgsql
       as $function$ 
       declare
        img_id integer;
       begin
          select img.id into img_id from public."Images" img where img."ServiceId" = new."ServiceId" and new."type" = 'primary' and img."type" = 'primary';
          if img_id is not null then
            raise exception 'Primary image was already set for service id = %', new."ServiceId";
          end if;	
          return new;
       end;
      $function$;
      
      create trigger primary_img before insert on public."Images" for each row execute procedure primary_img();
      `);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('drop trigger if exists primary_img on public."Images"');
  }
};
