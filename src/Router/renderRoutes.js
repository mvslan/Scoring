// renderRoutes
export default (routes, switchProps = {}, extraProps = {}) => {
  return routes && routes.length > 0 ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          location={route.location}
          sensitive={route.sensitive}
          children={route.children}
          render={(props) => {
            // beforeEnter
            const { beforeEnter, ...nextProps } = route;
            if (route.beforeEnter && typeof route.beforeEnter === "function") {
              return (
                <AsyncBeforeEnter
                  beforeEnter={beforeEnter}
                  route={nextProps}
                  {...props}
                  {...extraProps}
                />
              );
            }
            return route.render && typeof route.render ? (
              route.render({ ...props, ...extraProps, route: nextProps })
            ) : route.component ? (
              <route.component route={nextProps} {...props} {...extraProps} />
            ) : null;
          }}
        />
      ))}
    </Switch>
  ) : null;
};
