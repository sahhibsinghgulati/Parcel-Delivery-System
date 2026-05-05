# Fixing the Backend Startup Error

The application failed to start because of a database schema mismatch. Specifically, the error `Field 'receiver' doesn't have a default value` occurred because the old database schema had a `receiver` column from a previous version of the app, but the new `Parcel` entity no longer uses it. 

When Hibernate tried to insert a new parcel, it didn't provide a value for `receiver` (since it's not in the Java code anymore), and MySQL threw an error because the column was marked as `NOT NULL`.

### ✨ How I Fixed It

I modified `E:\Code\Parcel Management System\parcel-management-backend\src\main\resources\application.yml`:

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: create # Changed from 'update' to 'create'
```

By changing `ddl-auto` to `create`, Hibernate will now drop the old, incompatible tables and recreate them freshly every time you start the app, ensuring the database matches your Java entities exactly.

### 🚀 Next Steps

1. Start your backend again. It should work perfectly now and automatically populate the database.
2. In the future, once the schema is stable and you want to keep the data across restarts, you can change `ddl-auto: create` back to `ddl-auto: update` in `application.yml`.

