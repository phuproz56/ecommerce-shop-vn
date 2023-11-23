import pandas as pd 
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse 
import xlsxwriter
class CF(object):
    """docstring for CF"""
    def __init__(self, Y_data, k, dist_func = cosine_similarity, uuCF = 1):
        self.uuCF = uuCF # user-user (1) or item-item (0) CF
        self.label_encoder_user = LabelEncoder()
        self.label_encoder_item = LabelEncoder()
        self.Y_data = Y_data if uuCF else Y_data[:, [1, 0, 2]] 
    # Handle non-numeric values in the data
        try:
            self.Y_data = self.Y_data.astype(float)
        except ValueError as e:
            print(f"Error converting data to float: {e}")
            print("Attempting to replace non-numeric values with NaN")
            self.Y_data = pd.to_numeric(self.Y_data.flatten(), errors='coerce').reshape(self.Y_data.shape)
        #self.Y_data = self.Y_data.astype(float)
        self.k = k
        self.dist_func = dist_func
        self.Ybar_data = None
        # number of users and items. Remember to add 1 since id starts from 0
        self.n_users = int(np.nanmax(self.Y_data[:, 0].astype(float).astype(np.float64).astype('int'), initial=0)) + 1
        self.n_items = int(np.nanmax(self.Y_data[:, 1].astype(float).astype(np.float64).astype('int'), initial=0)) + 1
        #self.n_users = int(np.max(self.Y_data[:, 0])) + 1 
        #self.n_items = int(np.max(self.Y_data[:, 1])) + 1
        
    
    def add(self, new_data):
        """
        Update Y_data matrix when new ratings come.
        For simplicity, suppose that there is no new user or item.
        """
        self.Y_data = np.concatenate((self.Y_data, new_data), axis = 0)
    
    def normalize_Y(self):
        users = self.Y_data[:, 0] # all users - first col of the Y_data
        self.Ybar_data = self.Y_data.copy()
        self.mu = np.zeros((self.n_users,))
        for n in range(self.n_users):
            # row indices of rating done by user n
            # since indices need to be integers, we need to convert
            ids = np.where(users == n)[0].astype(np.int32)
            # indices of all ratings associated with user n
            item_ids = self.Y_data[ids, 1] 
            # and the corresponding ratings 
            ratings = self.Y_data[ids, 2]
            # take mean
            m = np.mean(ratings) 
            if np.isnan(m):
                m = 0 # to avoid empty array and nan value
            self.mu[n] = m

            # normalize
            self.Ybar_data[ids, 2] = ratings - self.mu[n]

        ################################################
        # form the rating matrix as a sparse matrix. Sparsity is important 
        # for both memory and computing efficiency. For example, if #user = 1M, 
        # #item = 100k, then shape of the rating matrix would be (100k, 1M), 
        # you may not have enough memory to store this. Then, instead, we store 
        # nonzeros only, and, of course, their locations.
        self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
            (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users))
        self.Ybar = self.Ybar.tocsr()

    def similarity(self):
        eps = 1e-6
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)
    
        
    def refresh(self):
        """
        Normalize data and calculate similarity matrix again (after
        some few ratings added)
        """
        self.normalize_Y()
        self.similarity() 
        
    def fit(self):
        self.refresh()
        
    
    def __pred(self, u, i, normalized = 1):
        """ 
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        # Step 1: find all users who rated i
        ids = np.where(self.Y_data[:, 1] == i)[0].astype(np.int32)
        # Step 2: 
        users_rated_i = (self.Y_data[ids, 0]).astype(np.int32)
        # Step 3: find similarity btw the current user and others 
        # who already rated i
        sim = self.S[u, users_rated_i]
        # Step 4: find the k most similarity users
        a = np.argsort(sim)[-self.k:] 
        # and the corresponding similarity levels
        nearest_s = sim[a]
        # How did each of 'near' users rated item i
        r = self.Ybar[i, users_rated_i[a]]
        if normalized:
            # add a small number, for instance, 1e-8, to avoid dividing by 0
            return (r*nearest_s)[0]/(np.abs(nearest_s).sum() + 1e-8)

        return (r*nearest_s)[0]/(np.abs(nearest_s).sum() + 1e-8) + self.mu[u]
    
    def pred(self, u, i, normalized = 1):
        """ 
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        if self.uuCF: return self.__pred(u, i, normalized)
        return self.__pred(i, u, normalized)
            
    
    def recommend(self, u):
        """
        Determine all items should be recommended for user u.
        The decision is made based on all i such that:
        self.pred(u, i) > 0. Suppose we are considering items which 
        have not been rated by u yet. 
        """
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()              
        recommended_items = []
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.__pred(u, i)
                if rating > 0: 
                    recommended_items.append(i)
        
        return recommended_items 
    
    def recommend2(self, u):
        """
        Determine all items should be recommended for user u.
        The decision is made based on all i such that:
        self.pred(u, i) > 0. Suppose we are considering items which 
        have not been rated by u yet. 
        """
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()              
        recommended_items = []
    
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.__pred(u, i)
                if rating > 0: 
                    recommended_items.append(i)
        
        return recommended_items 
    
    def print_recommendation(self):
        file1 = open('C:\\LuanVan-HK1_23-24\\Ecommerce-shop-vn\\Test1.txt', 'w')
        file2 = open('C:\\LuanVan-HK1_23-24\\Ecommerce-shop-vn\\Test2.txt', 'w')
        for u in range(self.n_users):
            recommended_items = self.recommend(u)
            if self.uuCF:
                if(recommended_items):
                    file1.write(str(u) + '\n')
                    file2.write(str(recommended_items)[1:-1] + '\n')
                    #print('Recommend item(s):', recommended_items, 'to user', u)
            else: 
                if(recommended_items):
                    print('Recommend item', u, 'to user(s) : ', recommended_items)
        # file1.close()
        # file2.close()
        # file1 = open('E:\\Workspace\\xampp\\htdocs\\laravel\\online-shop\\resources\\views\\pages\\product\\file1.txt', 'r')
        # file2 = open('E:\\Workspace\\xampp\\htdocs\\laravel\\online-shop\\resources\\views\\pages\\product\\file2.txt', 'r')
        # data1 = file1.read()
        # data2 = file2.read()
        # file1.close()
        # file2.close()
#######################
# data file 
r_cols = ['user_id', 'item_id', 'rating']
#ratings = pd.read_csv('E:\\Workspace\\python\\24_collaborativefiltering\\python\\ex.dat', sep = ' ', names = r_cols, encoding='latin-1')
#ratings = pd.read_csv('E:\\Workspace\\xampp\\htdocs\\laravel\\online-shop\\resources\\views\\pages\\product\\exnot.csv', sep = ',', names = r_cols, encoding='latin-1')
#Y_data = ratings.as_matrix()
read_file = pd.read_excel ("C:\\LuanVan-HK1_23-24\\Ecommerce-shop-vn\\comment.xlsx")
read_file.to_csv ("C:\\LuanVan-HK1_23-24\\Ecommerce-shop-vn\\comment.csv", index = None, header=True) 
ratings = pd.DataFrame(pd.read_csv("C:\\LuanVan-HK1_23-24\\Ecommerce-shop-vn\\comment.csv", sep = ',', names = r_cols, encoding='latin-1')) 
Y_data = ratings.values


rs = CF(Y_data, k = 2, uuCF = 1)
rs.fit()

rs.print_recommendation()

#######################
#rs = CF(Y_data, k = 2, uuCF = 0)
#rs.fit()

#rs.print_recommendation()
