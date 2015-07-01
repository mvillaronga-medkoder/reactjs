using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.ComponentModel.DataAnnotations;

using System.Threading;

namespace reactjs.web.services
{ 
    public class RepositoryMock
    {
        #region Members

        protected static Dictionary<Type, Dictionary<object, object>> _tables = null;
        IList<object> _queryPassthroughObject = null;
        IList<object> _querySqlPassthroughObject = null;

        #endregion

        #region Constructors

        public RepositoryMock()
        {
            if (null == _tables)
                _tables = new Dictionary<Type, Dictionary<object, object>>();
        }

        public RepositoryMock(Dictionary<Type, Dictionary<object, object>> tables)
        {
            _tables = tables;
        }

        public RepositoryMock(Dictionary<Type, Dictionary<object, object>> tables, IList<object> querySqlPassthroughObject, IList<object> queryPassthroughObject)
        {
            _tables = tables;
            _queryPassthroughObject = queryPassthroughObject;
            _querySqlPassthroughObject = querySqlPassthroughObject;
        }

        #endregion

        #region IRepository Interface Implementation

        public void BeginTransaction()
        {
            //intentionally left blank -- Should do deep copy?
        }

        public void CommitTransaction()
        {
            //intentionally left blank -- should through out transactional data?
        }

        public void RollbackTransaction()
        {
            //intentionally left blank -- should reset to stored transactional state?
        }

        public void Flush()
        {
            //do nothing
        }

        public void Save(object obj)
        {
            object id = assignObjectId(obj, true);
            Type type = obj.GetType();

            if (!_tables.ContainsKey(type))
            {
                _tables.Add(type, new Dictionary<object, object>());
                //throw new Exception(string.Format("Table for type {0} not found stored in this repository instance", type.Name));
            }

            //ALS HACK: Added to prevent issues with NHibernate and Date/Time truncating ms; causing issues w/ Encounter State when sorting
            Thread.Sleep(1);

            _tables[type].Remove(id);
            _tables[type].Add(id, obj);
        }

        public void Delete(object obj)
        {
            object id = assignObjectId(obj);
            Type type = obj.GetType();

            if (null == _tables[type])
                throw new Exception(string.Format("Table for type {0} not found stored in this repository instance", type.Name));

            //ALS HACK: Added to prevent issues with NHibernate and Date/Time truncating ms; causing issues w/ Encounter State when sorting
            Thread.Sleep(1);

            _tables[type].Remove(id);
        }

        public object GetById(Type objType, object objId)
        {
            return _tables[objType][objId];
        }

        public TEntity GetById<TEntity>(object objId, bool force = false)
        {
            if (_tables[typeof(TEntity)].ContainsKey(objId))
                return (TEntity)_tables[typeof(TEntity)][objId];
            else
                return default(TEntity);
        }

        public IQueryable<TEntity> Query<TEntity>()
        {
            if (!_tables.ContainsKey(typeof(TEntity)))
            {
                _tables.Add(typeof(TEntity), new Dictionary<object, object>());
                //throw new Exception(string.Format("Table for type {0} not found stored in this repository instance", type.Name));
            }
            return (IQueryable<TEntity>)_tables[typeof(TEntity)].Values.Cast<TEntity>().AsQueryable();
        }

        public IQueryable<TEntity> Query<TEntity, TRelated>(System.Linq.Expressions.Expression<Func<TEntity, TRelated>> fetchExpression)
        {
            return (IQueryable<TEntity>)_tables[typeof(TEntity)].Values.Cast<TEntity>().AsQueryable();
        }

        public IQueryable<TEntity> Query<TEntity, TRelated1, TRelated2>(System.Linq.Expressions.Expression<Func<TEntity, IEnumerable<TRelated1>>> mainFetch, System.Linq.Expressions.Expression<Func<TRelated1, TRelated2>> childFetch)
        {
            return (IQueryable<TEntity>)_tables[typeof(TEntity)].Values.Cast<TEntity>().AsQueryable();
        }

        public IList<T> QuerySqlPassthrough<T>(string sql) where T : class
        {
            return _querySqlPassthroughObject.Cast<T>().ToList();
        }

        /// <summary>
        /// Used to set the data for the passthrough object that you'd like to be returned.
        /// </summary>
        /// <param name="passthroughObject"></param>
        public void SetQuerySqlPassthroughObject(IList<object> passthroughObject)
        {
            _querySqlPassthroughObject = passthroughObject;
        }

        public IList<T> QueryPassthrough<T>(string sql) where T : class
        {
            return _queryPassthroughObject.Cast<T>().ToList();
        }

        /// <summary>
        /// Used to set the data for the passthrough object that you'd like to be returned.
        /// </summary>
        /// <param name="passthroughObject"></param>
        public void SetQueryPassthroughObject(IList<object> passthroughObject)
        {
            _queryPassthroughObject = passthroughObject;
        }

        public void SqlExecuteNonQuery(System.Data.IDbCommand cmd)
        {
            //this space intentionally left blank
        }

        public void restoreSession(string conString)
        {
            //this space intentionally left blank
        }

        public void Dispose()
        {
            //this space intentionally left blank
        }

        #endregion

        #region Utility Methods

        //Finds the object's id, optionally assigning one for 'new' guids/int id fields.
        private object assignObjectId(object obj, bool simulateIdentityField = false)
        {
            object ret = null;
            Type classType = obj.GetType();
            PropertyInfo pi = classType.GetProperties()
                                .Where(p => p.GetCustomAttributes(typeof(KeyAttribute), true).Length != 0).FirstOrDefault();

            if (pi == null)
            {
                string idName = null;
            string className = obj.GetType().Name;

                //will need to put exception listing here for objects that don't conform to the 
                //ClassNameId pattern      -AND- which did not apply the [Key] annotation to the id column in the Domain       
            switch (className)
            {
                default:
                    idName = className + "Id";
                    break;
            }

                pi = classType.GetProperty(idName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (null == pi)
                throw new Exception(string.Format("Cannot find id property {0} on class {1}.", idName, className));
            }

            ret = pi.GetValue(obj);

            //if we want to simulate an identity field,
            //for int32 fields, replace null or 0 ids with a pseudo identity id (existing max + 1)
            //for guids, replace null with new guid
            if (simulateIdentityField)
            {
                var propertyType = pi.PropertyType;
                if (ret == null && Nullable.GetUnderlyingType(propertyType) == typeof(System.Int32) ||
                    (propertyType == typeof(System.Int32) && (int)ret == 0))
                {
                    if (!_tables.ContainsKey(classType) || _tables[classType].Count() == 0)
                    {
                        pi.SetValue(obj, 1);
                        ret = 1;
                    }
                    else
                    {
                        var maxId = (int?)_tables[classType].Keys.Max();
                        ret = maxId.GetValueOrDefault() + 1;
                        pi.SetValue(obj, ret);
                    }
                }
                else if (ret == null && Nullable.GetUnderlyingType(propertyType) == typeof(System.Guid) ||
                    (propertyType == typeof(System.Guid) && (System.Guid)ret == Guid.Empty))
                {
                    ret = Guid.NewGuid();
                    pi.SetValue(obj, ret);
                }
            }

            if (ret == null)
            {
                throw new Exception("ID value found to be null on class.");
            }
            return ret;
        }

        public Dictionary<Type, Dictionary<object, object>> getTables()
        {
            return _tables;
        }

        #endregion
    }
}
