import EvoLabelLight from '@/components/EvoLabelLight';

export default function EvoAccessLabel({ akses }) {
  if (!akses || !Array.isArray(akses)) {
    return <div className="text-red-500 text-sm">Tidak ada data hak akses</div>;
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      {akses.map((menu) => {
        const isMenuValid =
          menu.aksi &&
          Object.values(menu.aksi || {}).some((val) => val === true);

        const isSubMenuValid =
          Array.isArray(menu.nama_sub_menu) &&
          menu.nama_sub_menu.some(
            (sub) =>
              sub.aksi &&
              Object.values(sub.aksi || {}).some((val) => val === true)
          );

        if (!isMenuValid && !isSubMenuValid) return null;

        return (
          <div
            key={menu.id || menu.nama_menu}
            className="border rounded-[12px] p-2 bg-gray-100"
          >
            <div className="text-card">{menu.nama_menu}</div>

            {Array.isArray(menu.nama_sub_menu) ? (
              <ul className="mt-1 ml-3 list-disc">
                {menu.nama_sub_menu
                  .filter(
                    (sub) =>
                      sub.aksi &&
                      Object.values(sub.aksi || {}).some((val) => val === true)
                  )
                  .map((subMenu) => (
                    <li key={subMenu.id || subMenu.nama} className="mt-1 ml-2">
                      <div className="mt-3 text-content_medium font-semibold">
                        {subMenu.nama}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-0">
                        {Object.entries(subMenu.aksi || {})
                          .filter(([, val]) => val !== null)
                          .map(([action, allowed]) =>
                            allowed ? (
                              <EvoLabelLight key={action} text={action} />
                            ) : (
                              <EvoLabelLight
                                key={action}
                                text={action}
                                className="!bg-gray-300/20 !text-black/40 !border-black/10"
                              />
                            )
                          )}
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              isMenuValid && (
                <div className="flex gap-1 mt-1">
                  {Object.entries(menu.aksi || {})
                    .filter(([, val]) => val !== null)
                    .map(([action, allowed]) =>
                      allowed ? (
                        <EvoLabelLight key={action} text={action} />
                      ) : (
                        <EvoLabelLight
                          key={action}
                          text={action}
                          className="!bg-gray-300/20 !text-black/40 !border-black/10"
                        />
                      )
                    )}
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
